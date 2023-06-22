const { Import_invoice_detail, Import_invoice } = require("../models");
const { QueryTypes } = require("sequelize");

const createImportInvoiceDetail = async (req, res) => {
  const { quantity, id_i_invoice, id_u_ingredient, unit_price } = req.body;
  try {
    await Import_invoice_detail.create({
      id_i_invoice,
      id_u_ingredient,
      quantity,
      unit_price
    });
    res.status(200).json({ message: "Tạo mới thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const updateImportInvoiceDetail = async (req, res) => {
  const { id_i_invoice, id_u_ingredient } = req.params;
  const { quantity } = req.body;
  try {
    const check = await Import_invoice.findOne({
      where: {
        id_i_invoice,
      },
    });
    if (check.status != 1) {
      await Import_invoice_detail.sequelize.query(
        "UPDATE import_invoice_details SET quantity = :quantity WHERE id_i_invoice = :id_i_invoice AND id_u_ingredient = :id_u_ingredient",
        {
          replacements: { id_i_invoice, id_u_ingredient, quantity },
          type: QueryTypes.UPDATE,
          raw: true,
        }
      );
      res.status(200).json({ message: "Cập nhật thành công!" });
    } else {
      res
        .status(400)
        .json({ message: "Không thể cập nhật hoá đơn đã hoàn thành!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const deleteImportInvoiceDetail = async (req, res) => {
  const { id_i_invoice, id_u_ingredient } = req.params;
  try {
    const check = await Import_invoice.findOne({
      where: {
        id_i_invoice,
      },
    });
    if (check.status != 1) {
      await Import_invoice_detail.destroy({
        where: {
          id_i_invoice,
          id_u_ingredient,
        },
      });
      res.status(200).json({ message: "Xoá thành công!" });
    } else {
      res.status(400).json({ message: "Không thể xoá hoá đơn đã hoàn thành!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getDetailImportInvoiceDetail = async (req, res) => {
  const { id_i_invoice, id_u_ingredient } = req.params;
  try {
    const item = await Import_invoice_detail.sequelize.query(
      "SELECT * FROM import_invoice_details WHERE id_i_invoice = :id_i_invoice AND id_u_ingredient = :id_u_ingredient",
      {
        replacements: { id_i_invoice, id_u_ingredient },
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
    createImportInvoiceDetail,
    updateImportInvoiceDetail,
    deleteImportInvoiceDetail,
    getDetailImportInvoiceDetail
};
