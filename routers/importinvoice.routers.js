const express = require("express");
const { getAllImportInvoice, getAllItemInImportInvoice, createImportInvoice, updateImportInvoice, createImportInvoiceDetail, deleteImportInvoiceDetail, updateImportInvoiceDetail, getDetailImportInvoice } = require("../controllers/importinvoice.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js");
const importinvoiceRouter = express.Router();

importinvoiceRouter.get("/", authenticate, authorize(["Admin"]), getAllImportInvoice);
importinvoiceRouter.get("/detail/:id_i_invoice", authenticate, authorize(["Admin"]), getDetailImportInvoice);
importinvoiceRouter.get("/:id_i_invoice", authenticate, authorize(["Admin"]), getAllItemInImportInvoice);
importinvoiceRouter.post("/", authenticate, authorize(["Admin"]), createImportInvoice);
importinvoiceRouter.put("/:id_i_invoice", authenticate, authorize(["Admin"]), updateImportInvoice);

module.exports = {
    importinvoiceRouter,
}