const express = require("express");
const { getAllImportInvoice, getAllItemInImportInvoice } = require("../controllers/importinvoice.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js")
const importinvoiceRouter = express.Router();

importinvoiceRouter.get("/", authenticate, authorize(["Admin"]), getAllImportInvoice);
importinvoiceRouter.get("/:id_i_invoice", authenticate, authorize(["Admin"]), getAllItemInImportInvoice);

module.exports = {
    importinvoiceRouter,
}