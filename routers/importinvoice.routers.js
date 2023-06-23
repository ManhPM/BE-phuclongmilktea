const express = require("express");
const { getAllImportInvoice, getAllItemInImportInvoice, createImportInvoice, updateImportInvoice, createImportInvoiceDetail, deleteImportInvoiceDetail, updateImportInvoiceDetail, getDetailImportInvoice } = require("../controllers/importinvoice.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js");
const importinvoiceRouter = express.Router();

importinvoiceRouter.get("/", authenticate, authorize(["Quản lý"]), getAllImportInvoice);
importinvoiceRouter.get("/detail/:id_i_invoice", authenticate, authorize(["Quản lý"]), getDetailImportInvoice);
importinvoiceRouter.get("/:id_i_invoice", authenticate, authorize(["Quản lý"]), getAllItemInImportInvoice);
importinvoiceRouter.post("/", authenticate, authorize(["Quản lý"]), createImportInvoice);
importinvoiceRouter.put("/:id_i_invoice", authenticate, authorize(["Quản lý"]), updateImportInvoice);

module.exports = {
    importinvoiceRouter,
}