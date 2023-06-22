const express = require("express");
const { getAllExportInvoice, getAllItemInExportInvoice, createExportInvoice, updateExportInvoice, getDetailExportInvoice } = require("../controllers/exportinvoice.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js")
const exportinvoiceRouter = express.Router();

exportinvoiceRouter.get("/", authenticate, authorize(["Admin"]), getAllExportInvoice);
exportinvoiceRouter.get("/detail/:id_e_invoice", authenticate, authorize(["Admin"]), getDetailExportInvoice);
exportinvoiceRouter.get("/:id_e_invoice", authenticate, authorize(["Admin"]), getAllItemInExportInvoice);
exportinvoiceRouter.post("/", authenticate, authorize(["Admin"]), createExportInvoice);
exportinvoiceRouter.put("/:id_e_invoice", authenticate, authorize(["Admin"]), updateExportInvoice);

module.exports = {
    exportinvoiceRouter,
}