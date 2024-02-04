const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  addedBy: {
    type: Number,
    required: true,
  },
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
