const express = require("express");
const {Account, Customer, Cart, Wishlist} = require("./models");
const {sequelize} = require("./models");
const {rootRouter} = require("./routers")
const { QueryTypes } = require("sequelize");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const jwt = require("jsonwebtoken");
const path = require("path");
const port = 3005;
const app = express();
const cors = require("cors");
const configfb = require("./config/configfb")
const bcrypt = require("bcryptjs");
const FacebookStrategy  = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '975421124869-n4irtjs1qrm9eq8hpddlpo5rma85rihn.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

app.use(cookieParser());
app.use(cors());
//cài ứng dụng sử dụng json
app.use(express.json());
//cài static file
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

/*  PASSPORT SETUP  */

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/google/success', async (req, res) =>  {
  try {
    const account = await Account.sequelize.query(
      "SELECT A.* FROM accounts as A, customers as C WHERE A.id_account = C.id_account AND C.email = :email",
      {
        replacements: {
          email: userProfile._json.email,
        },
        type: QueryTypes.SELECT,
      }
    );
    if(account[0] && account[0].isActive == 1){
      const token = jwt.sign({ username: account[0].username }, "manhpham2k1", {
        expiresIn: 60 * 60 * 24 * 15,
      });
      const refreshToken = jwt.sign({ username: account[0].username }, "manhpham2k1", {
        expiresIn: 60 * 60 * 24 * 30,
      });
      const customer = await Customer.findOne({
        where: {
          id_account: account[0].id_account,
        },
      });
      res
      .status(200)
      .json({
        message: "Đăng nhập thành công!",
        userProfile,
        token,
        refreshToken,
        userInfo: customer,
        expireTimeToken: 60 * 60 * 24 * 15,
        expireTimeRefreshToken: 60 * 60 * 24 * 30,
      });
    }
    else {
      const password = Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password.toString(), salt);
      const newAccount = await Account.create({
        username: "gg"+userProfile._json.sub,
        id_role: 1,
        password: hashPassword,
        isActive: 1,
      });
      const newCustomer = await Customer.create({
        id_account: newAccount.id_account,
        name: userProfile._json.name+" google",
        image: userProfile._json.picture,
        email: userProfile._json.email,
      });
      await Cart.create({
        id_customer: newCustomer.id_customer,
      });
      await Wishlist.create({
        id_customer: newCustomer.id_customer,
      });
      const token = jwt.sign({ username: newAccount.username }, "manhpham2k1", {
        expiresIn: 15 * 24 * 60 * 60,
      });
      const refreshToken = jwt.sign(
        { username: newAccount.username },
        "manhpham2k1",
        {
          expiresIn: 30 * 24 * 60 * 60,
        }
      );
      res.status(200).json({
        message: "Đăng nhập thành công!",
        token,
        refreshToken,
        userInfo: newCustomer,
        expireTimeToken: 15 * 60 * 60 * 24,
        expireTimeRefreshToken: 30 * 60 * 60 * 24,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
});

app.get('/facebook/success', async (req, res) =>  {
  try {
    const customer = await Customer.findOne({
      where: {
        name: userProfile.displayName+" facebook",
      }
    })
    if(customer){
      const account = await Account.findOne({
        where: {
          id_account: customer.id_account
        }
      })
      const token = jwt.sign({ username: account.username }, "manhpham2k1", {
        expiresIn: 15 * 24 * 60 * 60,
      });
      const refreshToken = jwt.sign(
        { username: account.username },
        "manhpham2k1",
        {
          expiresIn: 30 * 24 * 60 * 60,
        }
      );
      res.status(200).json({
        message: "Đăng nhập thành công!",
        token,
        refreshToken,
        userInfo: customer,
        expireTimeToken: 15 * 60 * 60 * 24,
        expireTimeRefreshToken: 30 * 60 * 60 * 24,
      });
    }
    else {
      const password = Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password.toString(), salt);
      const newAccount = await Account.create({
        username: "fb"+userProfile.id,
        id_role: 1,
        password: hashPassword,
      });
      const newCustomer = await Customer.create({
        id_account: newAccount.id_account,
        name: userProfile.displayName+" facebook",
      });
      await Cart.create({
        id_customer: newCustomer.id_customer,
      });
      await Wishlist.create({
        id_customer: newCustomer.id_customer,
      });
      const token = jwt.sign({ username: newAccount.username }, "manhpham2k1", {
        expiresIn: 15 * 24 * 60 * 60,
      });
      const refreshToken = jwt.sign(
        { username: newAccount.username },
        "manhpham2k1",
        {
          expiresIn: 30 * 24 * 60 * 60,
        }
      );
      res.status(200).json({
        message: "Đăng nhập thành công!",
        token,
        refreshToken,
        userInfo: newCustomer,
        expireTimeToken: 15 * 60 * 60 * 24,
        expireTimeRefreshToken: 30 * 60 * 60 * 24,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
});

app.get('/error', (req, res) => res.status(400).json({message: "Lỗi đang nhập!"}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */
 
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3005/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));

passport.use(new FacebookStrategy({
  clientID: configfb.FACEBOOK_KEY,
  clientSecret: configfb.FACEBOOK_SECRET,
  callbackURL: configfb.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    userProfile = profile;
    return done(null, userProfile);
  });
}
));
 
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/google/success');
});

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/facebook/success');
});

//dùng router
app.use(rootRouter);

//lắng nghe sự kiện kết nối
app.listen(port, async () => {
    console.log(`App listening on http://localhost:${port}`);
    try {
        await sequelize.authenticate();
        console.log('Kết nối thành công!.');
      } catch (error) {
        console.error('Kết nối thất bại:', error);
      }
})