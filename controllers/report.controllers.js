const { Order } = require("../models");
const { QueryTypes } = require("sequelize");

const getAllReport = async (req, res) => {
  const { date } = req.query;
  try {
    if(date){
      const itemList = await Order.sequelize.query(
        "SELECT R.*, DATE_FORMAT(R.date,'%d-%m-%Y') as date, S.name as name_store FROM reports as R, stores as S WHERE date LIKE :date AND R.id_store = S.id_store",
        {
          replacements: { date: `%${date}%` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(201).json({ itemList });
    }
    else{
      const itemList = await Order.sequelize.query(
        "SELECT R.*, DATE_FORMAT(R.date,'%d-%m-%Y') as date, S.name as name_store FROM reports as R, stores as S WHERE R.id_store = S.id_store",
        {
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      res.status(201).json({ itemList });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getReportDetail = async (req, res) => {
  const {id_report} = req.params
  try {
    const report = await Order.sequelize.query(
      "SELECT R.countOrder, CONCAT(FORMAT(SUM(R.revenue), 0)) as revenue, DATE_FORMAT(R.date,'%d-%m-%Y') as date, S.name as name_store FROM reports as R, stores as S WHERE R.id_store = S.id_store AND R.id_report = :id_report",
      {
        replacements: { id_report: id_report},
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const itemList = await Order.sequelize.query(
      "SELECT RD.*, I.name as name_item FROM report_details as RD, items as I WHERE I.id_item = RD.id_item AND RD.id_report = :id_report",
      {
        replacements: { id_report: id_report },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(201).json({ itemList, report: report[0] });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

module.exports = {
    getAllReport,
    getReportDetail
};