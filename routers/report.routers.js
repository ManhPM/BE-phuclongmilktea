const express = require("express");
const { getAllReport, getReportDetail } = require("../controllers/report.controllers.js");
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js");
const reportRouter = express.Router();

reportRouter.get("/", authenticate, authorize(["Admin"]), getAllReport);
reportRouter.get("/detail/:id_report", authenticate, authorize(["Admin"]), getReportDetail);


module.exports = {
    reportRouter,
}