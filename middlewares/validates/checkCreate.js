const {
  Shipper,
  Customer,
  Staff,
} = require("../../models");

const checkCreateAccount = (Model) => {
  return async (req, res, next) => {
    const { username } = req.body;
    const account = await Model.findOne({
      where: {
        username,
      },
    });
    if (!account) {
      next();
    } else {
      res.status(400).json({ message: "Tài khoản đã tồn tại!" });
    }
  };
};

const checkCreateItem = (Model) => {
  return async (req, res, next) => {
    const { name, price, id_type } = req.body;
    const item = await Model.findOne({
      where: {
        name,
        price,
        id_type,
      },
    });
    if (!item) {
      next();
    } else {
      res.status(400).json({ message: "Sản phẩm đã tồn tại!" });
    }
  };
};

const checkCreateType = (Model) => {
  return async (req, res, next) => {
    const { name } = req.body;
    const item = await Model.findOne({
      where: {
        name,
      },
    });
    if (!item) {
      next();
    } else {
      res.status(400).json({ message: "Loại hàng đã tồn tại!" });
    }
  };
};

const checkCreateReview = (Model) => {
  return async (req, res, next) => {
    const { id_order } = req.query;
    const order = await Model.findOne({
      where: {
        id_order,
      },
    });
    if (order.status == 1) {
      next();
    } else {
      res
        .status(400)
        .json({
          message:
            "Đơn hàng đã bị huỷ hoặc chưa được xác nhận. Không thể đánh giá!",
        });
    }
  };
};

const checkCreateProvider = (Model) => {
  return async (req, res, next) => {
    const { name, phone } = req.body;
    const item = await Model.findOne({
      where: {
        name,
        phone,
      },
    });
    if (!item) {
      next();
    } else {
      res.status(400).json({ message: "Nhà cung cấp đã tồn tại!" });
    }
  };
};
const checkCreateStore = (Model) => {
  return async (req, res, next) => {
    const { name, phone, address } = req.body;
    const item = await Model.findOne({
      where: {
        name,
        address,
        phone,
      },
    });
    if (!item) {
      next();
    } else {
      res.status(400).json({ message: "Cửa hàng đã tồn tại!" });
    }
  };
};
const checkCreatePayment = (Model) => {
  return async (req, res, next) => {
    const { name } = req.body;
    const item = await Model.findOne({
      where: {
        name,
      },
    });
    if (!item) {
      next();
    } else {
      res.status(400).json({ message: "Phương thức thanh toán đã tồn tại!" });
    }
  };
};
const checkCreateUnprocessedIngredient = (Model) => {
  return async (req, res, next) => {
    const { name } = req.body;
    const item = await Model.findOne({
      where: {
        name,
      },
    });
    if (!item) {
      next();
    } else {
      res.status(400).json({ message: "Nguyên liệu thô đã tồn tại!" });
    }
  };
};
const checkCreateIngredient = (Model) => {
  return async (req, res, next) => {
    const { name } = req.body;
    const item = await Model.findOne({
      where: {
        name,
      },
    });
    if (!item) {
      next();
    } else {
      res.status(400).json({ message: "Nguyên liệu đã tồn tại!" });
    }
  };
};

const checkItemValue = (Model) => {
  return async (req, res, next) => {
    const { price } = req.body;
    if (price > 0) {
      next();
    } else {
      res.status(400).json({ message: "Giá phải lớn hơn 0!" });
    }
  };
};

const checkCreateEmail = async (req, res, next) => {
  const { email } = req.body
  try {
    const customer = await Customer.findOne({
      where: {
        email,
      },
    });
    const shipper = await Shipper.findOne({
      where: {
        email,
      },
    });
    const staff = await Staff.findOne({
      where: {
        email,
      },
    });
    if(customer || shipper || staff){
      res.status(400).json({ message: "Địa chỉ email đã tồn tại!" });
    }
    else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
}

module.exports = {
  checkCreateAccount,
  checkCreateItem,
  checkItemValue,
  checkCreateReview,
  checkCreateType,
  checkCreateProvider,
  checkCreateStore,
  checkCreatePayment,
  checkCreateUnprocessedIngredient,
  checkCreateIngredient,
  checkCreateEmail
};
