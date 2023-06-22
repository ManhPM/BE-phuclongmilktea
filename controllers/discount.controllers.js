const { Discount } = require("../models");

const getAllDiscount = async (req, res) => {
  try {
    const discountList = await Discount.findAll({});
    res.status(201).json({discountList});
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const createDiscount = async (req, res) => {
  const {code, discount_percent, end_date, min_quantity, quantity, description} = req.body
  try {
    const start_date = new Date();
    start_date.setHours(start_date.getHours() + 7);
    console.log(code, discount_percent, end_date, min_quantity, quantity, description)
    await Discount.create({code, discount_percent, start_date, end_date, min_quantity, quantity, description});
    res.status(201).json({message: "Tạo mới thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const updateDiscount = async (req, res) => {
  const {code} = req.params
  const { discount_percent, end_date, min_quantity, quantity, description} = req.body
  try {
    const update = await Discount.findOne({
      where: {
        code
      }
    });
    update.discount_percent = discount_percent
    update.end_date = end_date
    update.min_quantity = min_quantity
    update.quantity = quantity
    update.description = description
    await update.save();
    res.status(200).json({message: "Cập nhật thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const getDetailDiscount = async (req, res) => {
  const {code} = req.params
  try {
    const item = await Discount.findOne({
      where: {
        code
      }
    });
    res.status(200).json({item});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

module.exports = {
  getAllDiscount,
  createDiscount,
  updateDiscount,
  getDetailDiscount
};
