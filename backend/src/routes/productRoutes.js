const express = require('express');
const { body } = require('express-validator');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post(
  '/',
  auth,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('description').optional().isString().withMessage('Description must be text')
  ],
  createProduct
);

router.put(
  '/:id',
  auth,
  [
    body('name').optional().trim().notEmpty().withMessage('Name must not be empty'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('description').optional().isString().withMessage('Description must be text')
  ],
  updateProduct
);

router.delete('/:id', auth, deleteProduct);

module.exports = router;
