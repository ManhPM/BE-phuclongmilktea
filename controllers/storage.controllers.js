const { Storage } = require("../models");

const getAllStorage = async (req, res) => {
  try {
    const storageList = await Storage.findAll({});
    res.status(201).json({storageList});
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
    getAllStorage,
};
