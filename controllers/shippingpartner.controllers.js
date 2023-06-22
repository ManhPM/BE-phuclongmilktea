const { Shipping_partner } = require("../models");

const getAllShippingPartner = async (req, res) => {
  try {
    const shipping_partnerList = await Shipping_partner.findAll({});
    res.status(201).json({shipping_partnerList});
  } catch (error) {
    res.status(500).json(error);
  }
};

const createShippingPartner = async (req, res) => {
  const {name, address, unit_price} = req.body
  try {
    await Shipping_partner.create({name, address, unit_price});
    res.status(201).json({message: "Tạo mới thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const updateShippingPartner = async (req, res) => {
  const {id_shipping_partner} = req.params
  const {name, address, unit_price} = req.body
  try {
    const update = await Shipping_partner.findOne({
      where: {
        id_shipping_partner
      }
    });
    update.name = name
    update.address = address
    update.unit_price = unit_price
    await update.save();
    res.status(200).json({message: "Cập nhật thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const getDetailShippingPartner = async (req, res) => {
  const {id_shipping_partner} = req.params
  try {
    const item = await Shipping_partner.findOne({
      where: {
        id_shipping_partner
      }
    });
    res.status(200).json({item});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

module.exports = {
    getAllShippingPartner,
    createShippingPartner,
    updateShippingPartner,
    getDetailShippingPartner
};
