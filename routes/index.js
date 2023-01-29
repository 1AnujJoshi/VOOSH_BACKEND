const express = require("express");
const router = express.Router();
const { addUser, loginUser } = require("../controllers/user_controller");
const orderApi = require("../controllers/order_controller");
const { addOrder, getOrder } = require("../controllers/order_controller");

console.log("router loaded");
const { checkToken } = require("../config/jwt.config");
const { asyncHandler } = require("../helpers/error-handler");
router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to voosh-order-api" });
});
router.post("/add-user", addUser);
router.post("/login-user", loginUser);
router.post("/add-order", asyncHandler(checkToken), addOrder);
router.get("/get-order", asyncHandler(checkToken), getOrder);

module.exports = router;
