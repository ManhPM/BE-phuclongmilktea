const { Export_invoice, Export_invoice_detail } = require("../models");
const { QueryTypes } = require("sequelize");

const getAllExportInvoice = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getAllItemInExportInvoice = async (req, res) => {
  const { id_e_invoice } = req.params;
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
  const { description } = req.body;
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
    await Export_invoice.create({
      description,
      id_staff: staff[0].id_staff,
      datetime,
      status: 0,
    });
    res.status(200).json({ message: "Tạo mới thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const updateExportInvoice = async (req, res) => {
  const { id_e_invoice } = req.params;
  const { description, status } = req.body;
  try {
    const check = await Export_invoice.findOne({
      where: {
        id_e_invoice,
      },
    });
    const staff = await Export_invoice.sequelize.query(
      "SELECT S.* FROM staffs as S, accounts as A WHERE A.username = :username AND S.id_account = A.id_account",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    if (check.status != 1) {
      if (status == 1) {
        const itemInExportInvoiceList = await Export_invoice.sequelize.query(
          "SELECT * FROM export_invoice_details WHERE id_e_invoice = :id_e_invoice",
          {
            replacements: { id_e_invoice },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        if (itemInExportInvoiceList[0]) {
          let i = 0;
          while (itemInExportInvoiceList[i]) {
            await Export_invoice.sequelize.query(
              "UPDATE unprocessed_ingredient_stores SET quantity = quantity - :quantity WHERE id_u_ingredient = :id_u_ingredient AND id_store = :id_store",
              {
                replacements: {
                  quantity: itemInExportInvoiceList[i].quantity,
                  id_u_ingredient: itemInExportInvoiceList[i].id_u_ingredient,
                  id_store: staff[0].id_store,
                },
                type: QueryTypes.UPDATE,
                raw: true,
              }
            );
            i++;
          }
          await Export_invoice.sequelize.query(
            "UPDATE export_invoices SET status = 1 WHERE id_e_invoice = :id_e_invoice",
            {
              replacements: { id_e_invoice },
              type: QueryTypes.UPDATE,
              raw: true,
            }
          );
          res.status(200).json({ message: "Hoàn thành!" });
        } else {
          await Export_invoice.sequelize.query(
            "UPDATE export_invoices SET status = 1 WHERE id_e_invoice = :id_e_invoice",
            {
              replacements: { id_e_invoice },
              type: QueryTypes.UPDATE,
              raw: true,
            }
          );
          res.status(200).json({ message: "Hoàn thành!" });
        }
      } else {
        const datetime = new Date();
        datetime.setHours(datetime.getHours() + 7);
        check.description = description;
        check.datetime = datetime;
        await update.save();
        res.status(200).json({ message: "Cập nhật thành công!" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Hoá đơn đã hoàn thành không thể cập nhật!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getDetailExportInvoice = async (req, res) => {
  const { id_e_invoice } = req.params;
  try {
    const item = await Export_invoice.findOne({
      where: {
        id_e_invoice,
      },
    });
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

module.exports = {
  getAllExportInvoice,
  getDetailExportInvoice,
  getAllItemInExportInvoice,
  updateExportInvoice,
  createExportInvoice,
};
