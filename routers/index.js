const express = require("express");
const { itemRouter } = require("./item.routers");
const { accountRouter } = require("./account.routers");
const { cartRouter } = require("./cart.routers");
const { orderRouter } = require("./order.routers");
const { wishlistRouter } = require("./wishlist.routers");
const { typeRouter } = require("./type.routers");
const { paymentRouter } = require("./payment.routers");
const { providerRouter } = require("./provider.routers");
const { importinvoiceRouter } = require("./importinvoice.routers");
const { exportinvoiceRouter } = require("./exportinvoice.routers");
const { ingredientRouter } = require("./ingredient.routers");
const { unprocessedIngredientRouter } = require("./unprocessedingredient.routers");
const { storeRouter } = require("./store.routers");
const { staffRouter } = require("./staff.routers");
const { discountRouter } = require("./discount.routers");
const { shippingPartnerRouter } = require("./shippingpartner.routers");
const { reportRouter } = require("./report.routers");
const { importinvoiceDetailRouter } = require("./importinvoicedetail.routers");
const { exportinvoiceDetailRouter } = require("./exportinvoicedetail.routers");
const { recipeRouter } = require("./recipe.routers");
const rootRouter = express.Router();

rootRouter.use("/items", itemRouter);
rootRouter.use("/providers", providerRouter);
rootRouter.use("/account", accountRouter);
rootRouter.use("/cart", cartRouter);
rootRouter.use("/orders", orderRouter);
rootRouter.use("/wishlist", wishlistRouter);
rootRouter.use("/types", typeRouter);
rootRouter.use("/payment_methods", paymentRouter);
rootRouter.use("/importinvoices", importinvoiceRouter);
rootRouter.use("/exportinvoices", exportinvoiceRouter);
rootRouter.use("/ingredients", ingredientRouter);
rootRouter.use("/unprocessedingredients", unprocessedIngredientRouter);
rootRouter.use("/stores", storeRouter);
rootRouter.use("/staffs", staffRouter);
rootRouter.use("/discounts", discountRouter);
rootRouter.use("/shipping_partners", shippingPartnerRouter);
rootRouter.use("/reports", reportRouter);
rootRouter.use("/importinvoicedetails", importinvoiceDetailRouter);
rootRouter.use("/exportinvoicedetails", exportinvoiceDetailRouter);
rootRouter.use("/recipes", recipeRouter);

module.exports = {
    rootRouter,
}