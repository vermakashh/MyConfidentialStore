// MongoDB Schema (orderSchema.js)
const mongoose = require('mongoose');

const ShippingDetailsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  phone: { type: String, required: true }
});

const OrderItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true }
});

const OrderSchema = new mongoose.Schema({
  orderNumber: { 
    type: String, 
    required: true,
    unique: true,
    default: () => 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  },
  customer: ShippingDetailsSchema,
  items: [OrderItemSchema],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered'], 
    default: 'pending' 
  },
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users',

  }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
