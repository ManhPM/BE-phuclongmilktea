const { Export_invoice_detail, Export_invoice } = require("../models");
const { QueryTypes } = require("sequelize");


const createExportInvoiceDetail = async (req, res) => {
  const {quantity, id_e_invoice, id_u_ingredient, unit_price} = req.body
  try {
    await Export_invoice_detail.create({id_e_invoice, id_u_ingredient, quantity, unit_price})
  res.status(200).json({ message: "Tạo mới thành công!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateExportInvoiceDetail = async (req, res) => {
  const {id_e_invoice, id_u_ingredient} = req.params
  const {quantity} = req.body
  try {
    const check = await Export_invoice.findOne({
      where: {
        id_e_invoice
      }
    });
    if(check.status != 1){
      await Export_invoice_detail.sequelize.query(
        "UPDATE export_invoice_details SET quantity = :quantity WHERE id_e_invoice = :id_e_invoice AND id_u_ingredient = :id_u_ingredient",
        {
          replacements: { id_e_invoice, id_u_ingredient, quantity },
          type: QueryTypes.UPDATE,
          raw: true,
        }
      );
      res.status(200).json({ message: "Cập nhật thành công!" });
    }
    else{
      res.status(400).json({ message: "Không thể cập nhật hoá đơn đã hoàn thành!" });
    }
    
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteExportInvoiceDetail = async (req, res) => {
  const {id_e_invoice, id_u_ingredient} = req.params
  try {
    const check = await Export_invoice.findOne({
      where: {
        id_e_invoice
      }
    });
    if(check.status != 1){
      await Export_invoice_detail.destroy({
        where: {
          id_e_invoice,
          id_u_ingredient
        }
      });
      res.status(200).json({ message: "Xoá thành công!" });
    }
    else{
      res.status(400).json({ message: "Không thể xoá hoá đơn đã hoàn thành!" });
    }
  
  } catch (error) {
    res.status(500).json(error);
  }
};
const getDetailExportInvoiceDetail = async (req, res) => {
  const { id_e_invoice, id_u_ingredient } = req.params;
  try {
    const item = await Export_invoice_detail.sequelize.query(
      "SELECT * FROM export_invoice_details WHERE id_e_invoice = :id_e_invoice AND id_u_ingredient = :id_u_ingredient",
      {
        replacements: { id_e_invoice, id_u_ingredient },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

module.exports = {
  createExportInvoiceDetail,
  updateExportInvoiceDetail,
  deleteExportInvoiceDetail,
  getDetailExportInvoiceDetail,
};
