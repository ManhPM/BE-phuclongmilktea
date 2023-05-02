const { Shipping_partner } = require("../models");

const getAllShippingPartner = async (req, res) => {
  try {
    const shipping_partnerList = await Shipping_partner.findAll({});
    res.status(201).json({shipping_partnerList});
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
    getAllShippingPartner,
};
