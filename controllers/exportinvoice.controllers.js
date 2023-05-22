const { Export_invoice } = require("../models");
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
    res.status(500).json(error);
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
    res.status(500).json(error);
  }
};

module.exports = {
    getAllExportInvoice,
    getAllItemInExportInvoice
};
