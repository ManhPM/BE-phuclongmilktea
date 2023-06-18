const express = require("express");
const {Account} = require("../models")
const {login, createAccountForCustomer, changePassword, forgotPassword, loginAdmin, verify, accessForgotPassword, loginShipper, createAccountForShipper, loginStaff, refreshToken, uploadAvatar, createAccountForStaff, updateProfile, getUserInfo} = require("../controllers/account.controllers");
const { checkExistAccount } = require("../middlewares/validates/checkExist");
const { checkCreateAccount, checkCreateEmail } = require("../middlewares/validates/checkCreate");
const {authenticate, authenticateRefreshToken} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")
const accountRouter = express.Router();

accountRouter.post("/login", checkExistAccount(Account), login);
accountRouter.get("/refreshtoken", authenticateRefreshToken, refreshToken);
accountRouter.post("/staff/login", checkExistAccount(Account), loginStaff);
accountRouter.put("/updateprofile", authenticate, authorize(["Khách hàng"]), updateProfile);
accountRouter.post("/avatar", authenticate, uploadAvatar);
accountRouter.post("/admin/login", checkExistAccount(Account), loginAdmin);
accountRouter.post("/shipper/login", checkExistAccount(Account), loginShipper);
accountRouter.get("/userinfo", authenticate, authorize(["Khách hàng"]), getUserInfo);
accountRouter.post("/create", checkCreateAccount(Account), checkCreateEmail, createAccountForCustomer);
accountRouter.post("/shipper/create", authenticate, authorize(["Admin"]), checkCreateAccount(Account), checkCreateEmail, createAccountForShipper);
accountRouter.post("/staff/create", authenticate, authorize(["Admin"]), checkCreateAccount(Account), checkCreateEmail, createAccountForStaff);
accountRouter.post("/forgotpassword", checkExistAccount(Account), forgotPassword);
accountRouter.post("/forgotpassword/verify", checkExistAccount(Account), verify);
accountRouter.post("/forgotpassword/verify/success", checkExistAccount(Account), accessForgotPassword);
accountRouter.put("/changepassword", authenticate, changePassword);

module.exports = {
    accountRouter,
}