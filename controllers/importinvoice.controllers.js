const { Import_invoice } = require("../models");
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
    if(info[0].id_role == 2){
        const importInvoiceList = await Import_invoice.sequelize.query(
            "SELECT II.*, SO.name as name_storage, SA.name as name_staff, P.name as name_provider FROM import_invoices AS II, storages as SO, staffs as SA, providers as P WHERE SA.id_staff = II.id_staff AND II.id_storage = SO.id_storage AND II.id_provider = P.id_provider",
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
            "SELECT II.*, SO.name as name_storage, SA.name as name_staff, P.name as name_provider FROM import_invoices AS II, storages as SO, staffs as SA, providers as P WHERE SA.id_staff = II.id_staff AND II.id_storage = SO.id_storage AND II.id_provider = P.id_provider AND II.id_staff = :id_staff",
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
      "SELECT II.*, (SELECT SUM(unit_price*quantity) FROM import_invoice_details WHERE id_i_invoice = II.id_i_invoice) as total, SO.name as name_storage, SA.name as name_staff, P.name as name_provider FROM import_invoices as II, providers as P, storages as SO, staffs as SA WHERE SA.id_staff = II.id_staff AND II.id_storage = SO.id_storage AND P.id_provider = II.id_provider AND II.id_i_invoice = :id_i_invoice",
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

module.exports = {
    getAllImportInvoice,
    getAllItemInImportInvoice
};
