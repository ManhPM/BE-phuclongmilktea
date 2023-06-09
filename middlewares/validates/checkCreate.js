const {
  Shipper,
  Customer,
  Staff,
  Discount,
  Import_invoice_detail,
  Export_invoice_detail,
  Recipe,
  Recipe_ingredient
} = require("../../models");
const { QueryTypes } = require("sequelize");

const checkCreateAccount = (Model) => {
  try {
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
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
};

const checkCreateItem = (Model) => {
  try {
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
        res.status(400).json({ message: "Sản phẩm đã tồn tại!" });
      }
    };
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
};

const checkCreateType = (Model) => {
  try {
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
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
};

const checkCreateReview = (Model) => {
  try {
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
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
};

const checkCreateProvider = (Model) => {
  try {
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
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
};

const checkCreateStore = (Model) => {
  try {
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
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
};

const checkCreatePayment = (Model) => {
  try {
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
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
};

const checkCreateUnprocessedIngredient = (Model) => {
  try {
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
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
};

const checkCreateIngredient = (Model) => {
  try {
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
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
};

const checkItemValue = (Model) => {
  try {
    return async (req, res, next) => {
      const { price } = req.body;
      if (price > 0) {
        next();
      } else {
        res.status(400).json({ message: "Giá phải lớn hơn 0!" });
      }
    };
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
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
    res.status(501).json({ message: "Error!" });
  }
}

const checkCreateDiscount = async (req, res, next) => {
  const { code } = req.body
  try {
    const item = await Discount.findOne({
      where: {
        code,
      },
    });
    if(item){
      res.status(400).json({ message: "Địa chỉ email đã tồn tại!" });
    }
    else {
      next();
    }
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
}


const checkPhoneCheckout = async (req, res, next) => {
  try {
    const info = await Customer.sequelize.query(
      "SELECT C.*, CU.phone FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
      {
        replacements: { username: `${req.username}` },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    if(info[0].phone){
      next();
    }
    else {
      res.status(400).json({ message: "Vui lòng cập nhật số điện thoại trước khi đặt hàng!" });
    }
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
}

const checkDiscountCode = async (req, res, next) => {
  const {code} = req.body
  try {
    if(code){
      const discount = await Discount.findOne({
        where: {
          code,
        },
      });
      if(discount){
        if(discount.quantity > 0){
          const date = new Date();
          date.setHours(date.getHours() + 7);
          if(discount.end_date >= date){
            next();
          }
          else {
            res.status(400).json({ message: "Mã giảm giá đã hết hạn sử dụng!" });
          }
        }
        else {
          res.status(400).json({ message: "Mã giảm giá đã hết lượt sử dụng!"});
        }
      }
      else{
        res.status(400).json({ message: "Mã giảm giá không hợp lệ!"});
      }
    }
    else {
      next();
    }
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
}

const checkCreateRecipeItem = async (req, res, next) => {
  const {id_item, id_ingredient} = req.body
  try {
      const item = await Recipe.findOne({
        where: {
          id_item,
          id_ingredient
        },
      });
      if(item){
        res.status(400).json({ message: "Công thức đã tồn tại!"});
      }
      else {
        next();
      }
  } catch (error) {
    res.status(500).json({ message: "Đã có lỗi xảy raa!" });
  }
}

const checkCreateRecipeIngredient = async (req, res, next) => {
  const {id_u_ingredient, id_ingredient} = req.body
  try {
      const item = await Recipe_ingredient.findOne({
        where: {
          id_u_ingredient,
          id_ingredient
        },
      });
      if(item){
        res.status(400).json({ message: "Công thức đã tồn tại!"});
      }
      else {
        next();
      }
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
}

const checkCreateShippingPartner = (Model) => {
  try {
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
        res.status(400).json({ message: "Đơn vị vận chuyển đã tồn tại!" });
      }
    };
  } catch (error) {
    res.status(501).json({ message: "Error!" })
  }
};

const checkValueShippingPartner = async (req, res, next) => {
  const { unit_price } = req.body;
  try {
    if (unit_price >= 0) {
      next();
    } else {
      res.status(400).json({ message: "Giá trị phải lớn hơn 0!" });
    }
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
};

const checkUnConfirmedOrder = (Model) => {
  try {
    return async (req, res, next) => {
      const info = await Customer.sequelize.query(
        "SELECT C.*, CU.phone FROM carts as C, customers as CU, accounts as A WHERE A.username = :username AND CU.id_account = A.id_account AND CU.id_customer = C.id_customer",
        {
          replacements: { username: `${req.username}` },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      const item = await Model.findOne({
        where: {
          id_customer: info[0].id_customer,
          status: 0,
        },
      });
      if (!item) {
        next();
      } else {
        res.status(400).json({ message: "Đang có đơn hàng chưa xác nhận, không thể đặt thêm!" });
      }
    };
  } catch (error) {
    res.status(501).json({ message: "Error!" });
  }
};

const checkCreateImportInvoiceDetail = async (req, res, next) => {
  const {id_u_ingredient, id_i_invoice} = req.body
    try {
        if(id_i_invoice){
          const item = await Import_invoice_detail.sequelize.query(
            "SELECT * FROM import_invoice_details WHERE id_i_invoice = :id_i_invoice AND id_u_ingredient = :id_u_ingredient",
            {
              replacements: { id_i_invoice, id_u_ingredient },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          if (!item[0]) {
            next();
          } else {
            res.status(400).json({ message: "Đã có sản phẩm này trong hoá đơn!" });
          }
        }
        else{
          const {id_u_ingredient, id_i_invoice} = req.params
          const item = await Import_invoice_detail.sequelize.query(
            "SELECT * FROM import_invoice_details WHERE id_i_invoice = :id_i_invoice AND id_u_ingredient = :id_u_ingredient",
            {
              replacements: { id_i_invoice, id_u_ingredient },
              type: QueryTypes.SELECT,
              raw: true,
            }
          );
          if (!item[0]) {
            res.status(400).json({ message: "Chi tiết không tồn tại!" });
          } else {
            next();
          }
        }
    } catch (error) {
      res.status(501).json({ message: "Error!" });
    }
}

const checkCreateExportInvoiceDetail = async (req, res, next) => {
  const {id_u_ingredient, id_e_invoice} = req.body
    try {
      const item = await Export_invoice_detail.sequelize.query(
        "SELECT * FROM export_invoice_details WHERE id_e_invoice = :id_e_invoice AND id_u_ingredient = :id_u_ingredient",
        {
          replacements: { id_e_invoice, id_u_ingredient },
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      if (!item[0]) {
        next();
      } else {
        res.status(400).json({ message: "Đã có sản phẩm này trong hoá đơn!" });
      }
    } catch (error) {
      res.status(501).json({ message: "Error!" });
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
  checkCreateEmail,
  checkPhoneCheckout,
  checkDiscountCode,
  checkCreateShippingPartner,
  checkUnConfirmedOrder,
  checkCreateExportInvoiceDetail,
  checkCreateImportInvoiceDetail,
  checkCreateRecipeItem,
  checkCreateRecipeIngredient,
  checkCreateDiscount,
  checkValueShippingPartner,
};
