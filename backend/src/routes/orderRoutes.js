const express = require('express');
const { body } = require('express-validator');
const {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post(
  '/',
  auth,
  [
    body('userId').isInt({ min: 1 }).withMessage('userId must be a valid integer'),
    body('productIds').isArray({ min: 1 }).withMessage('productIds must be a non-empty array')
  ],
  createOrder
);

router.get('/:id', auth, getOrderById);
router.put('/:id', auth, updateOrder);
router.delete('/:id', auth, deleteOrder);

module.exports = router;
