const express = require("express");
const { getAllExportInvoice, getAllItemInExportInvoice, createExportInvoice, updateExportInvoice, getDetailExportInvoice } = require("../controllers/exportinvoice.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js")
const exportinvoiceRouter = express.Router();

exportinvoiceRouter.get("/", authenticate, authorize(["Quản lý"]), getAllExportInvoice);
exportinvoiceRouter.get("/detail/:id_e_invoice", authenticate, authorize(["Quản lý"]), getDetailExportInvoice);
exportinvoiceRouter.get("/:id_e_invoice", authenticate, authorize(["Quản lý"]), getAllItemInExportInvoice);
exportinvoiceRouter.post("/", authenticate, authorize(["Quản lý"]), createExportInvoice);
exportinvoiceRouter.put("/:id_e_invoice", authenticate, authorize(["Quản lý"]), updateExportInvoice);

module.exports = {
    exportinvoiceRouter,
}