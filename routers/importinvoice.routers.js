const express = require("express");
const { getAllImportInvoice, getAllItemInImportInvoice, createImportInvoice, updateImportInvoice, createImportInvoiceDetail, deleteImportInvoiceDetail, updateImportInvoiceDetail } = require("../controllers/importinvoice.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js");
const importinvoiceRouter = express.Router();

importinvoiceRouter.get("/", authenticate, authorize(["Admin"]), getAllImportInvoice);
importinvoiceRouter.get("/:id_i_invoice", authenticate, authorize(["Admin"]), getAllItemInImportInvoice);
importinvoiceRouter.post("/", authenticate, authorize(["Admin"]), createImportInvoice);
importinvoiceRouter.put("/:id_i_invoice", authenticate, authorize(["Admin"]), updateImportInvoice);
importinvoiceRouter.post("/detail", authenticate, authorize(["Admin"]), createImportInvoiceDetail);
importinvoiceRouter.put("/detail/:id_i_invoice/:id_u_ingredient", authenticate, authorize(["Admin"]), updateImportInvoiceDetail);
importinvoiceRouter.delete("/detail/id_i]e_invoice/:id_u_ingredient", authenticate, authorize(["Admin"]), deleteImportInvoiceDetail);

module.exports = {
    importinvoiceRouter,
}