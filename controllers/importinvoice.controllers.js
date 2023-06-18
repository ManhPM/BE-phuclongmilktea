const { Import_invoice, Import_invoice_detail } = require("../models");
const { QueryTypes } = require("sequelize");


const getAllImportInvoice = async (req, res) => {
  try {
    const info = await Import_invoice.sequelize.query(
        "SELECT R.id_role FROM roles as R, accounts as A WHERE A.username = :username AND A.id_role = R.id_role",
        {
          replacements: { username: `${req.username}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
    );
    if(info[0].id_role == 5){
        const importInvoiceList = await Import_invoice.sequelize.query(
            "SELECT II.*, SA.name as name_staff, P.name as name_provider FROM import_invoices AS II, staffs as SA, providers as P WHERE SA.id_staff = II.id_staff AND II.id_provider = P.id_provider",
            {
              type: QueryTypes.SELECT,
              raw: true,
            }
        );
        res.status(200).json({ importInvoiceList });
    }
    else {
        const staff = await Import_invoice.sequelize.query(
            "SELECT S.* FROM staffs as S, accounts as A WHERE A.username = :username AND S.id_account = A.id_account",
            {
              replacements: { username: `${req.username}` },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
        const importInvoiceList = await Import_invoice.sequelize.query(
            "SELECT II.*, SA.name as name_staff, P.name as name_provider FROM import_invoices AS II, staffs as SA, providers as P WHERE SA.id_staff = II.id_staff AND II.id_provider = P.id_provider AND II.id_staff = :id_staff",
            {
              replacements: { id_staff: staff[0].id_staff },
              type: QueryTypes.SELECT,
              raw: true,
            }
        );
        res.status(200).json({ importInvoiceList });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllItemInImportInvoice = async (req, res) => {
  const {id_i_invoice} = req.params
  try {
    const itemInImportInvoiceList = await Import_invoice.sequelize.query(
      "SELECT IID.*, UI.name as name_u_ingredient FROM import_invoice_details as IID, import_invoices as II, unprocessed_ingredients as UI WHERE IID.id_i_invoice = II.id_i_invoice AND UI.id_u_ingredient = IID.id_u_ingredient AND II.id_i_invoice = :id_i_invoice",
      {
        replacements: { id_i_invoice },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const importinvoice = await Import_invoice.sequelize.query(
      "SELECT II.*, (SELECT SUM(unit_price*quantity) FROM import_invoice_details WHERE id_i_invoice = II.id_i_invoice) as total, SA.name as name_staff, P.name as name_provider FROM import_invoices as II, providers as P, staffs as SA WHERE SA.id_staff = II.id_staff AND P.id_provider = II.id_provider AND II.id_i_invoice = :id_i_invoice",
      {
        replacements: { id_i_invoice },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
  res.status(200).json({ importinvoice, itemInImportInvoiceList });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createImportInvoice = async (req, res) => {
  const {id_provider, description} = req.body
  try {
    const staff = await Import_invoice.sequelize.query(
      "SELECT S.* FROM staffs as S, accounts as A WHERE A.username = :username AND S.id_account = A.id_account",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const datetime = new Date();
    datetime.setHours(datetime.getHours() + 7);
    await Import_invoice.create({id_provider, description, id_staff: staff[0].id_staff, datetime, status: 0})
  res.status(200).json({ message: "Tạo mới thành công!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createImportInvoiceDetail = async (req, res) => {
  const {quantity, id_i_invoice, id_u_ingredient} = req.body
  try {
    await Import_invoice_detail.create({id_i_invoice, id_u_ingredient, quantity})
  res.status(200).json({ message: "Tạo mới thành công!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateImportInvoiceDetail = async (req, res) => {
  const {id_i_invoice, id_u_ingredient} = req.params
  const {quantity} = req.body
  try {
    const check = await Import_invoice.findOne({
      where: {
        id_i_invoice
      }
    });
    if(check.status != 1){
      const update = await Import_invoice_detail.findOne({
        where: {
          id_i_invoice,
          id_u_ingredient
        }
      });
      update.quantity = quantity
      await update.save();
      res.status(200).json({ message: "Cập nhật thành công!" });
    }
    else {
      res.status(400).json({ message: "Không thể cập nhật hoá đơn đã hoàn thành!" });
    }
  
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteImportInvoiceDetail = async (req, res) => {
  const {id_i_invoice, id_u_ingredient} = req.params
  try {
    const check = await Import_invoice.findOne({
      where: {
        id_i_invoice
      }
    });
    if(check.status != 1){
      await Import_invoice_detail.destroy({
        where: {
          id_i_invoice,
          id_u_ingredient
        }
      });
    res.status(200).json({ message: "Xoá thành công!" });
    }
    else{
      res.status(200).json({ message: "Không thể xoá hoá đơn đã hoàn thành!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateImportInvoice = async (req, res) => {
  const {id_i_invoice} = req.params
  const {id_provider, description, status} = req.body
  try {
    const check = await Import_invoice.findOne({
      where: {
        id_i_invoice
      }
    });
    if(check.status != 1){
      const update = await Import_invoice.findOne({
        where: {
          id_i_invoice
        }
      });
      const datetime = new Date();
      datetime.setHours(datetime.getHours() + 7);
      update.id_provider = id_provider
      update.description = description
      update.status = status
      update.datetime = datetime
      await update.save();
      res.status(200).json({ message: "Cập nhật thành công!" });
    }
    else{
      res.status(400).json({ message: "Hoá đơn đã hoàn thành không thể cập nhật!" });
    }
  
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
    getAllImportInvoice,
    getAllItemInImportInvoice,
    createImportInvoice,
    updateImportInvoice,
    createImportInvoiceDetail,
    updateImportInvoiceDetail,
    deleteImportInvoiceDetail
};
