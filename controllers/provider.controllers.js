const { Provider } = require("../models");

const getAllProvider = async (req, res) => {
  try {
    const prodiverList = await Provider.findAll({});
    res.status(201).json({prodiverList});
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const createProvider = async (req, res) => {
  const {name, phone, address} = req.body
  try {
    await Provider.create({name, phone, address});
    res.status(201).json({message: "Tạo mới thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const updateProvider = async (req, res) => {
  const {id_provider} = req.params
  const {name, phone, address} = req.body
  try {
    const update = await Provider.findOne({
      where: {
        id_provider
      }
    });
    update.name = name
    update.phone = phone
    update.address = address
    await update.save();
    res.status(200).json({message: "Cập nhật thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const getDetailProvider = async (req, res) => {
  const {id_provider} = req.params
  try {
    const item = await Provider.findOne({
      where: {
        id_provider
      }
    });
    res.status(200).json({item});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

module.exports = {
    getAllProvider,
    getDetailProvider,
    createProvider,
    updateProvider
};
