const express = require("express");
const { itemRouter } = require("./item.routers");
const { accountRouter } = require("./account.routers");
const { cartRouter } = require("./cart.routers");
const { orderRouter } = require("./order.routers");
const { wishlistRouter } = require("./wishlist.routers");
const { typeRouter } = require("./type.routers");
const { paymentRouter } = require("./payment.routers");
const { reviewRouter } = require("./review.routers");
const { storageRouter } = require("./storage.routers");
const { providerRouter } = require("./provider.routers");
const { importinvoiceRouter } = require("./importinvoice.routers");
const { exportinvoiceRouter } = require("./exportinvoice.routers");
const { ingredientRouter } = require("./ingredient.routers");
const rootRouter = express.Router();

rootRouter.use("/items", itemRouter);
rootRouter.use("/storages", storageRouter);
rootRouter.use("/providers", providerRouter);
rootRouter.use("/account", accountRouter);
rootRouter.use("/cart", cartRouter);
rootRouter.use("/orders", orderRouter);
rootRouter.use("/wishlist", wishlistRouter);
rootRouter.use("/types", typeRouter);
rootRouter.use("/payment_methods", paymentRouter);
rootRouter.use("/reviews", reviewRouter);
rootRouter.use("/importinvoices", importinvoiceRouter);
rootRouter.use("/exportinvoices", exportinvoiceRouter);
rootRouter.use("/ingredients", ingredientRouter);

module.exports = {
    rootRouter,
}