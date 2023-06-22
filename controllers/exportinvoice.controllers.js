const { Export_invoice, Export_invoice_detail } = require("../models");
const { QueryTypes } = require("sequelize");


const getAllExportInvoice = async (req, res) => {
  try {
    const info = await Export_invoice.sequelize.query(
        "SELECT R.id_role FROM roles as R, accounts as A WHERE A.username = :username AND A.id_role = R.id_role",
        {
          replacements: { username: `${req.username}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
    );
    if(info[0].id_role == 5){
        const exportInvoiceList = await Export_invoice.sequelize.query(
            "SELECT EI.*, SA.name as name_staff FROM export_invoices AS EI, staffs as SA WHERE SA.id_staff = EI.id_staff ",
            {
              type: QueryTypes.SELECT,
              raw: true,
            }
        );
        res.status(200).json({ exportInvoiceList });
    }
    else {
        const staff = await Export_invoice.sequelize.query(
            "SELECT S.* FROM staffs as S, accounts as A WHERE A.username = :username AND S.id_account = A.id_account",
            {
              replacements: { username: `${req.username}` },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
        const exportInvoiceList = await Export_invoice.sequelize.query(
            "SELECT EI.*, SA.name as name_staff FROM export_invoices AS EI, staffs as SA WHERE SA.id_staff = EI.id_staff  AND EI.id_staff = :id_staff",
            {
              replacements: { id_staff: staff[0].id_staff },
              type: QueryTypes.SELECT,
              raw: true,
            }
        );
        res.status(200).json({ exportInvoiceList });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getAllItemInExportInvoice = async (req, res) => {
  const {id_e_invoice} = req.params
  try {
    const itemInExportInvoiceList = await Export_invoice.sequelize.query(
      "SELECT EID.*, UI.name as name_u_ingredient FROM export_invoice_details as EID, export_invoices as EI, unprocessed_ingredients as UI WHERE EID.id_e_invoice = EI.id_e_invoice AND UI.id_u_ingredient = EID.id_u_ingredient AND EI.id_e_invoice = :id_e_invoice",
      {
        replacements: { id_e_invoice },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const exportinvoice = await Export_invoice.sequelize.query(
      "SELECT EI.*, (SELECT SUM(unit_price*quantity) FROM export_invoice_details WHERE id_e_invoice = EI.id_e_invoice) as total, SA.name as name_staff FROM export_invoices as EI, staffs as SA WHERE SA.id_staff = EI.id_staff  AND EI.id_e_invoice = :id_e_invoice",
      {
        replacements: { id_e_invoice },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
  res.status(200).json({ exportinvoice, itemInExportInvoiceList });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const createExportInvoice = async (req, res) => {
  const {description} = req.body
  try {
    const staff = await Export_invoice.sequelize.query(
      "SELECT S.* FROM staffs as S, accounts as A WHERE A.username = :username AND S.id_account = A.id_account",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const datetime = new Date();
    datetime.setHours(datetime.getHours() + 7);
    await Export_invoice.create({description, id_staff: staff[0].id_staff, datetime, status: 0})
  res.status(200).json({ message: "Tạo mới thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const updateExportInvoice = async (req, res) => {
  const {id_e_invoice} = req.params
  const {description, status} = req.body
  try {
    const update = await Export_invoice.findOne({
      where: {
        id_e_invoice
      }
    });
    const datetime = new Date();
    datetime.setHours(datetime.getHours() + 7);
    update.description = description
    update.datetime = datetime
    update.status = status
    await update.save();
    res.status(200).json({ message: "Cập nhật thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const createExportInvoiceDetail = async (req, res) => {
  const {quantity, id_e_invoice, id_u_ingredient, unit_price} = req.body
  try {
    await Export_invoice_detail.create({id_e_invoice, id_u_ingredient, quantity, status: 0, unit_price})
    res.status(200).json({ message: "Tạo mới thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
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
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
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
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getDetailExportInvoice = async (req, res) => {
  const {id_e_invoice} = req.params
  try {
    const item = await Export_invoice.findOne({
      where: {
        id_e_invoice
      }
    });
    res.status(200).json({item});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};


module.exports = {
    getAllExportInvoice,
    getDetailExportInvoice,
    getAllItemInExportInvoice,
    updateExportInvoice,
    createExportInvoice,
};
