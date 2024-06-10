const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  //precio//
  price: {
    type: String,
    required: true,
    trim: true,
  },
});

const product = mongoose.model("product", productSchema);

module.exports = product;