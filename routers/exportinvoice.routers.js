const express = require("express");
const { getAllExportInvoice, getAllItemInExportInvoice, createExportInvoice, updateExportInvoice, createExportInvoiceDetail, updateExportInvoiceDetail, deleteExportInvoiceDetail } = require("../controllers/exportinvoice.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js")
const exportinvoiceRouter = express.Router();

exportinvoiceRouter.get("/", authenticate, authorize(["Admin"]), getAllExportInvoice);
exportinvoiceRouter.get("/:id_e_invoice", authenticate, authorize(["Admin"]), getAllItemInExportInvoice);
exportinvoiceRouter.post("/", authenticate, authorize(["Admin"]), createExportInvoice);
exportinvoiceRouter.put("/:id_e_invoice", authenticate, authorize(["Admin"]), updateExportInvoice);
exportinvoiceRouter.post("/detail", authenticate, authorize(["Admin"]), createExportInvoiceDetail);
exportinvoiceRouter.put("/detail/:id_e_invoice/:id_u_ingredient", authenticate, authorize(["Admin"]), updateExportInvoiceDetail);
exportinvoiceRouter.delete("/detail/:id_e_invoice/:id_u_ingredient", authenticate, authorize(["Admin"]), deleteExportInvoiceDetail);
0
module.exports = {
    exportinvoiceRouter,
}