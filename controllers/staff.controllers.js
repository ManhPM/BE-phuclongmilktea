const { Staff, Account } = require("../models");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.sequelize.query(
      "SELECT ST.name as name_store, A.username, S.* FROM staffs as S, stores as ST, accounts as A WHERE ST.id_store = S.id_store AND S.id_account = A.id_account",
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(201).json({staffList});
  } catch (error) {
    res.status(500).json(error);
  }
};

const createStaff = async (req, res) => {
  const {name, id_store, username, password, email, phone, address, description, gender, birthday, id_role} = req.body
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password.toString(), salt);
    const newAccount = await Account.create({
      username,
      id_role,
      password: hashPassword,
    });
    await Staff.create({name, email, phone, address, description, gender, birthday, id_store, id_account: newAccount.id_account});
    res.status(201).json({message: "Tạo mới thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

const updateStaff = async (req, res) => {
  const {id_staff} = req.params
  const {name, email, phone, address, description, gender, birthday, id_role} = req.body
  try {
    const update = await Staff.findOne({
      where: {
        id_staff
      }
    });
    update.name = name
    update.email = email
    update.phone = phone
    update.address = address
    update.description = description
    update.gender = gender
    update.birthday = birthday
    update.id_role = id_role
    await update.save();
    res.status(200).json({message: "Cập nhật thành công!"});
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"});
  }
};

module.exports = {
  getAllStaff,
  createStaff,
  updateStaff
};
