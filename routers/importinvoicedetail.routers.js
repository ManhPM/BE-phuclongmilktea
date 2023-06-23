const express = require("express");
const { createImportInvoiceDetail, updateImportInvoiceDetail, getDetailImportInvoiceDetail, deleteImportInvoiceDetail } = require("../controllers/importinvoicedetail.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js");
const { checkCreateImportInvoiceDetail } = require("../middlewares/validates/checkCreate");
const importinvoiceDetailRouter = express.Router();

importinvoiceDetailRouter.get("/detail/:id_i_invoice/:id_u_ingredient", authenticate, authorize(["Quản lý"]), getDetailImportInvoiceDetail);
importinvoiceDetailRouter.post("/", authenticate, authorize(["Quản lý"]), checkCreateImportInvoiceDetail, createImportInvoiceDetail);
importinvoiceDetailRouter.put("/:id_i_invoice/:id_u_ingredient", authenticate, authorize(["Quản lý"]), updateImportInvoiceDetail);
importinvoiceDetailRouter.delete("/:id_i_invoice/:id_u_ingredient", authenticate, authorize(["Quản lý"]), deleteImportInvoiceDetail);

module.exports = {
    importinvoiceDetailRouter,
}