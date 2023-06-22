const express = require("express");
const { createImportInvoiceDetail, updateImportInvoiceDetail, getDetailImportInvoiceDetail, deleteImportInvoiceDetail } = require("../controllers/importinvoicedetail.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js");
const { checkCreateImportInvoiceDetail } = require("../middlewares/validates/checkCreate");
const importinvoiceDetailRouter = express.Router();

importinvoiceDetailRouter.get("/detail/:id_i_invoice/:id_u_ingredient", authenticate, authorize(["Admin"]), getDetailImportInvoiceDetail);
importinvoiceDetailRouter.post("/", authenticate, authorize(["Admin"]), checkCreateImportInvoiceDetail, createImportInvoiceDetail);
importinvoiceDetailRouter.put("/:id_i_invoice/:id_u_ingredient", authenticate, authorize(["Admin"]), updateImportInvoiceDetail);
importinvoiceDetailRouter.delete("/:id_i_invoice/:id_u_ingredient", authenticate, authorize(["Admin"]), deleteImportInvoiceDetail);

module.exports = {
    importinvoiceDetailRouter,
}