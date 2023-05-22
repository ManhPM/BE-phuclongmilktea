const { Store } = require("../models");

const getAllStore = async (req, res) => {
  try {
    const storeList = await Store.findAll({});
    res.status(201).json({storeList});
  } catch (error) {
    res.status(500).json(error);
  }
};

const createStore = async (req, res) => {
  const {name, phone, address, email} = req.body
  try {
    await Store.create({name, phone, address, email});
    res.status(201).json({message: "Tạo mới thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const updateStore = async (req, res) => {
  const id_store = req.params
  const {name, phone, address, email} = req.body
  try {
    const update = await Store.findOne({
      where: {
        id_store
      }
    });
    update.name = name
    update.phone = phone
    update.address = address
    update.email = email
    await update.save();
    res.status(200).json({message: "Cập nhật thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const updatePositionOfStore = async (req, res) => {
  const id_store = req.params
  const {storeLat, storeLng} = req.body
  try {
    const update = await Store.findOne({
      where: {
        id_store
      }
    });
    update.storeLat = storeLat
    update.storeLng = storeLng
    await update.save();
    res.status(200).json({message: "Cập nhật thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

module.exports = {
    getAllStore,
    createStore,
    updateStore,
    updatePositionOfStore
};
