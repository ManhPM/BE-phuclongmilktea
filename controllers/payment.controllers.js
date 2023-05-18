const { Payment_method } = require("../models");

const getAllPaymentMethod = async (req, res) => {
  try {
    const paymentList = await Payment_method.findAll({});
    res.status(201).json({paymentList});
  } catch (error) {
    res.status(500).json(error);
  }
};

const createPaymentMethod = async (req, res) => {
  const {name} = req.body
  try {
    await Payment_method.create({name});
    res.status(201).json({message: "Tạo mới thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const updatePaymentMethod = async (req, res) => {
  const id_payment = req.params
  const {name} = req.body
  try {
    const update = await Payment_method.findOne({
      where: {
        id_payment
      }
    });
    update.name = name
    await update.save();
    res.status(200).json({message: "Cập nhật thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

module.exports = {
  getAllPaymentMethod,
  createPaymentMethod,
  updatePaymentMethod
};
