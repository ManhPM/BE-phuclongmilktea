const { Item, Staff } = require("../models");
const { QueryTypes, NUMBER } = require("sequelize");

const createItem = async (req, res) => {
  const { id_type, image, name, price } = req.body;
  try {
    await Item.create({
      id_type,
      image,
      name,
      price,
      status: 1,
    });
    res.status(201).json({ message: "Tạo mới sản phẩm thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const updateItem = async (req, res) => {
  const { id_item } = req.params;
  const { id_type, image, name, price, status } = req.body;
  try {
    const itemUpdate = await Item.findOne({
      where: {
        id_item,
      },
    });
    itemUpdate.id_type = id_type;
    itemUpdate.name = name;
    itemUpdate.image = image;
    itemUpdate.price = price;
    itemUpdate.status = status;
    await itemUpdate.save();
    res.status(201).json({ message: "Cập nhật sản phẩm thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const deleteItem = async (req, res) => {
  const { id_item } = req.params;
  try {
    const check = await Item.sequelize.query(
      "SELECT COUNT(O.id_order) as count FROM orders as O, order_details as OD, items as I WHERE I.id_item = OD.id_item AND OD.id_order = O.id_order AND I.id_item = :id_item AND O.status != 1 AND O.status != 2",
      {
        replacements: { id_item: id_item },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    if (check[0].count == 0) {
      const itemUpdate = await Item.findOne({
        where: {
          id_item,
        },
      });
      itemUpdate.status = 0;
      await itemUpdate.save();
      res.status(200).json({ message: "Xoá sản phẩm thành công!" });
    } else {
      res.status(400).json({
        message: "Xoá sản phẩm thất bại. Còn hoá đơn đang hoạt động!",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getAllItem = async (req, res) => {
  const { name, id_type } = req.query;
  let { typesort } = req.query;
  if (!typesort) {
    typesort = 1;
  }
  const perPage = 12;
  const page = req.params.page || 1;
  try {
    if (name) {
      if (id_type) {
        const count = await Item.sequelize.query(
          "SELECT COUNT(I.id_item) as totalPage FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type != 4 AND T.id_type = :id_type AND I.status != 0 AND I.name COLLATE UTF8_GENERAL_CI LIKE :name",
          {
            replacements: {
              name: `%${name}%`,
              perPage: perPage,
              id_type: id_type,
            },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        if (typesort == 1) {
          const itemList = await Item.sequelize.query(
            "SELECT I.*, T.name as name_type FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND T.id_type = :id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY I.price ASC LIMIT :from,:perPage",
            {
              replacements: {
                id_type: id_type,
                name: `%${name}%`,
                from: (page - 1) * perPage,
                perPage: perPage,
                id_type: id_type,
              },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ totalItems: count[0].totalPage, itemList });
        } else {
          const itemList = await Item.sequelize.query(
            "SELECT I.*, T.name as name_type FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND T.id_type = :id_type AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY I.price DESC LIMIT :from,:perPage",
            {
              replacements: {
                id_type: id_type,
                name: `%${name}%`,
                from: (page - 1) * perPage,
                perPage: perPage,
                id_type: id_type,
              },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ totalItems: count[0].totalPage, itemList });
        }
      } else {
        const count = await Item.sequelize.query(
          "SELECT COUNT(I.id_item) as totalPage FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND I.name COLLATE UTF8_GENERAL_CI LIKE :name",
          {
            replacements: { name: `%${name}%`, perPage: perPage },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        if (typesort == 1) {
          const itemList = await Item.sequelize.query(
            "SELECT I.*, T.name as name_type FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY I.price ASC LIMIT :from,:perPage",
            {
              replacements: {
                name: `%${name}%`,
                from: (page - 1) * perPage,
                perPage: perPage,
              },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ totalItems: count[0].totalPage, itemList });
        } else {
          const itemList = await Item.sequelize.query(
            "SELECT I.*, T.name as name_type FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND I.name COLLATE UTF8_GENERAL_CI LIKE :name ORDER BY I.price DESC LIMIT :from,:perPage",
            {
              replacements: {
                name: `%${name}%`,
                from: (page - 1) * perPage,
                perPage: perPage,
              },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ totalItems: count[0].totalPage, itemList });
        }
      }
    } else {
      if (id_type) {
        const count = await Item.sequelize.query(
          "SELECT COUNT(I.id_item) as totalPage FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND T.id_type = :id_type",
          {
            replacements: { id_type: id_type },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        if (typesort == 1) {
          const itemList = await Item.sequelize.query(
            "SELECT DISTINCT I.*, T.name as name_type FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND T.id_type = :id_type ORDER BY I.price ASC LIMIT :from,:perPage",
            {
              replacements: {
                id_type: id_type,
                from: (page - 1) * perPage,
                perPage: perPage,
              },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ totalItems: count[0].totalPage, itemList });
        } else {
          const itemList = await Item.sequelize.query(
            "SELECT DISTINCT I.*, T.name as name_type FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 AND T.id_type = :id_type ORDER BY I.price DESC LIMIT :from,:perPage",
            {
              replacements: {
                id_type: id_type,
                from: (page - 1) * perPage,
                perPage: perPage,
              },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ totalItems: count[0].totalPage, itemList });
        }
      } else {
        const count = await Item.sequelize.query(
          "SELECT COUNT(I.id_item) AS totalPage FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0",
          {
            replacements: { perPage: perPage },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
        if (typesort == 1) {
          //gia tang dan
          const itemList = await Item.sequelize.query(
            "SELECT I.*, T.name AS name_type FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 ORDER BY I.price ASC LIMIT :from,:perPage",
            {
              replacements: { from: (page - 1) * perPage, perPage: perPage },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ totalItems: count[0].totalPage, itemList });
        } else {
          // gia giam dan
          const itemList = await Item.sequelize.query(
            "SELECT I.*, T.name AS name_type FROM items as I, types as T WHERE T.id_type = I.id_type AND T.id_type != 4 AND I.status != 0 ORDER BY I.price DESC LIMIT :from,:perPage",
            {
              replacements: { from: (page - 1) * perPage, perPage: perPage },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          res.status(200).json({ totalItems: count[0].totalPage, itemList });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getDetailItem = async (req, res) => {
  const { id_item } = req.params;
  try {
    const item = await Item.sequelize.query(
      "SELECT I.*, T.name as name_type, (SELECT COUNT(id_item) FROM items WHERE id_item = I.id_item) as countLike FROM items AS I, types as T WHERE T.id_type = I.id_type AND T.id_type != 4 AND I.id_item = :id_item",
      {
        replacements: { id_item: id_item },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const get3ItemsEachType = async (req, res) => {
  try {
    const itemsEachType = await Item.sequelize.query(
      "SELECT * FROM (SELECT I.*, T.name AS name_type, row_number() over (partition by I.id_type) as type_rank FROM items as I, types as T WHERE I.id_type = T.id_type AND T.id_type != 4 ORDER BY I.price ASC) test WHERE type_rank <= 3",
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json(itemsEachType);
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getItems = async (req, res) => {
  const { quantity } = req.query;
  try {
    const items = await Item.sequelize.query(
      "SELECT I.*, T.name FROM items as I, types as T WHERE I.id_type = T.id_type AND T.id_type != 4 ORDER BY I.price ASC LIMIT :quantity",
      {
        replacements: { quantity: Number(quantity) },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const getTopping = async (req, res) => {
  try {
    const items = await Item.sequelize.query(
      "SELECT I.* FROM items as I WHERE I.id_type = 4",
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const processingItem = async (req, res) => {
  const { id_item } = req.params;
  const { quantity } = req.body;
  try {
    const staff = await Item.sequelize.query(
      "SELECT S.* FROM staffs as S, accounts as A WHERE A.username = :username AND A.id_account = S.id_account",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    const ingredientList = await Item.sequelize.query(
      "SELECT R.id_item, R.id_ingredient, IG.unit, IG.name as name_ingredient, IG.image, (R.quantity*(:quantity)) as totalquantity, (SELECT quantity FROM ingredient_stores WHERE id_ingredient = R.id_ingredient AND id_store = :id_store) as quantity FROM recipes as R, ingredients as IG WHERE R.id_item = :id_item AND IG.id_ingredient = R.id_ingredient",
      {
        replacements: {
          id_item: id_item,
          quantity: quantity,
          id_store: staff[0].id_store,
        },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    let i = 0;
    let isEnough = 1;
    while (ingredientList[i]) {
      if (ingredientList[i].totalquantity >= ingredientList[i].quantity) {
        isEnough = 0;
        break;
      } else {
        i++;
      }
    }
    if (isEnough == 1) {
      let j = 0;
      while (ingredientList[j]) {
        await Item.sequelize.query(
          "UPDATE ingredient_stores SET quantity = quantity - (:quantity) WHERE id_ingredient = :id_ingredient AND id_store = :id_store",
          {
            replacements: {
              id_ingredient: ingredientList[j].id_ingredient,
              quantity: ingredientList[j].totalquantity,
              id_store: staff[0].id_store,
            },
            type: QueryTypes.UPDATE,
            raw: true,
          }
        );
        j++;
      }
      await Item.sequelize.query(
        "UPDATE item_stores SET quantity = quantity + (:quantity) WHERE id_item = :id_item AND id_store = :id_store",
        {
          replacements: {
            quantity: quantity,
            id_item,
            id_item,
            id_store: staff[0].id_store,
          },
          type: QueryTypes.UPDATE,
          raw: true,
        }
      );
      res.status(201).json({ ingredientList });
    } else {
      res.status(401).json({ message: "Số lượng nguyên liệu không đủ!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

module.exports = {
  getAllItem,
  getDetailItem,
  get3ItemsEachType,
  createItem,
  updateItem,
  deleteItem,
  getItems,
  processingItem,
  getTopping,
};
