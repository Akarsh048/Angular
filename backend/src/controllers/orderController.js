const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { getSqlServerPool, sql } = require('../config/sqlserver');

const ensureUserExists = async (userId) => {
  const db = await getSqlServerPool();
  const rows = await db
    .request()
    .input('id', sql.Int, userId)
    .query('SELECT id FROM users WHERE id = @id');
  return rows.recordset.length > 0;
};

const calculateTotal = async (productIds) => {
  const products = await Product.find({ _id: { $in: productIds } });
  if (products.length !== productIds.length) {
    return null;
  }

  const total = products.reduce((sum, item) => sum + item.price, 0);
  return Number(total.toFixed(2));
};

const createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, productIds } = req.body;

    const userExists = await ensureUserExists(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!productIds.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: 'One or more product ids are invalid' });
    }

    const totalAmount = await calculateTotal(productIds);
    if (totalAmount === null) {
      return res.status(404).json({ message: 'One or more products not found' });
    }

    const order = await Order.create({ userId, productIds, totalAmount });
    return res.status(201).json(order);
  } catch (error) {
    return next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order id' });
    }

    const order = await Order.findById(id).populate('productIds');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json(order);
  } catch (error) {
    return next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order id' });
    }

    const { productIds } = req.body;
    if (!Array.isArray(productIds) || !productIds.length) {
      return res.status(400).json({ message: 'productIds is required' });
    }

    if (!productIds.every((item) => mongoose.Types.ObjectId.isValid(item))) {
      return res.status(400).json({ message: 'One or more product ids are invalid' });
    }

    const totalAmount = await calculateTotal(productIds);
    if (totalAmount === null) {
      return res.status(404).json({ message: 'One or more products not found' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { productIds, totalAmount },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json(updatedOrder);
  } catch (error) {
    return next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order id' });
    }

    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json({ message: 'Order deleted' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder
};
