const { tryCatchHandler } = require("../helpers/error-handler");
const Order = require("../models/order");
const User = require("../models/user");

const addOrder = tryCatchHandler(async (req, res) => {
  req.body.user_id = req.payload.id;
  const user = await User.findById(req.payload.id).lean();
  req.body.phone_number = user.phone_number;
  let product = {
    product_name: req.body.product_name,
    desc: req.body.desc,
    price: req.body.price,
  };
  req.body.product = product;
  const order = await Order.create(req.body);
  res.status(200).json({ message: "order added successfully!!", order });
});

const getOrder = tryCatchHandler(async (req, res) => {
  let query = { user_id: req.payload.id };
  let project = {
    name: 1,
    phone_number: 1,
  };
  const orders = await Order.find(query).lean();
  const user = await User.findById(req.payload.id, project).lean();
  if (!orders) {
    throw new Error("No orders found!!");
  } else {
    res.status(200).json({ message: "success!!", user, orders });
  }
});

module.exports = {
  addOrder,
  getOrder,
};
