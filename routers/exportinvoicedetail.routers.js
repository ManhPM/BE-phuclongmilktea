const express = require("express");
const {Export_invoice_detail} = require("../models")
const { getDetailExportInvoiceDetail, deleteExportInvoiceDetail, updateExportInvoiceDetail, createExportInvoiceDetail } = require("../controllers/exportinvoicedetail.controllers");
const {authorize} = require("../middlewares/auth/authorize.js")
const {authenticate} = require("../middlewares/auth/authenticate.js");
const { checkCreateExportInvoiceDetail } = require("../middlewares/validates/checkCreate");
const exportinvoiceDetailRouter = express.Router();

exportinvoiceDetailRouter.get("/detail/:id_e_invoice/:id_u_ingredient", authenticate, authorize(["Quản lý"]), getDetailExportInvoiceDetail);
exportinvoiceDetailRouter.post("/", authenticate, authorize(["Quản lý"]), checkCreateExportInvoiceDetail, createExportInvoiceDetail);
exportinvoiceDetailRouter.put("/:id_e_invoice/:id_u_ingredient", authenticate, authorize(["Quản lý"]), checkCreateExportInvoiceDetail, updateExportInvoiceDetail);
exportinvoiceDetailRouter.delete("/:id_e_invoice/:id_u_ingredient", authenticate, authorize(["Quản lý"]), deleteExportInvoiceDetail);

module.exports = {  
    exportinvoiceDetailRouter,
}