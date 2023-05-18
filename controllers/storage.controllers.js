const { Storage } = require("../models");

const getAllStorage = async (req, res) => {
  try {
    const storageList = await Storage.findAll({});
    res.status(201).json({storageList});
  } catch (error) {
    res.status(500).json(error);
  }
};

const createStorage = async (req, res) => {
  const {name, description} = req.body
  try {
    await Storage.create({name, description});
    res.status(201).json({message: "Tạo mới thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const updateStorage = async (req, res) => {
  const id_storage = req.params
  const {name, description} = req.body
  try {
    const update = await Storage.findOne({
      where: {
        id_storage
      }
    });
    update.name = name
    update.description = description
    await update.save();
    res.status(200).json({message: "Cập nhật thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

module.exports = {
    getAllStorage,
    createStorage,
    updateStorage
};
