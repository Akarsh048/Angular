const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    totalAmount: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
