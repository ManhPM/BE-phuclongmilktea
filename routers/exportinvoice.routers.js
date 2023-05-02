const express = require("express");
const { getAllExportInvoice, getAllItemInExportInvoice } = require("../controllers/exportinvoice.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js")
const exportinvoiceRouter = express.Router();

exportinvoiceRouter.get("/", authenticate, authorize(["Admin"]), getAllExportInvoice);
exportinvoiceRouter.get("/:id_i_invoice", authenticate, authorize(["Admin"]), getAllItemInExportInvoice);

module.exports = {
    exportinvoiceRouter,
}