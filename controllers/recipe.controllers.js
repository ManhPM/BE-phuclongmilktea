const { Recipe } = require("../models");
const { QueryTypes } = require("sequelize");

const createRecipe = async (req, res) => {
  const { id_ingredient, id_item, quantity } = req.body;
  try {
    await Recipe.create({
        id_ingredient, id_item, quantity 
    });
    res.status(200).json({ message: "Tạo mới thành công!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateImportInvoiceDetail = async (req, res) => {
  const { id_ingredient, id_item } = req.params;
  const { quantity } = req.body;
  try {
      await Recipe.sequelize.query(
        "UPDATE import_invoice_details SET quantity = :quantity WHERE id_i_invoice = :id_i_invoice AND id_u_ingredient = :id_u_ingredient",
        {
          replacements: { id_i_invoice, id_u_ingredient, quantity },
          type: QueryTypes.UPDATE,
          raw: true,
        }
      );
      res.status(200).json({ message: "Cập nhật thành công!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteImportInvoiceDetail = async (req, res) => {
  const { id_i_invoice, id_u_ingredient } = req.params;
  try {
      await Recipe.destroy({
        where: {
          id_i_invoice,
          id_u_ingredient,
        },
      });
      res.status(200).json({ message: "Xoá thành công!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getDetailImportInvoiceDetail = async (req, res) => {
  const { id_i_invoice, id_u_ingredient } = req.params;
  try {
    const item = await Recipe.sequelize.query(
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
