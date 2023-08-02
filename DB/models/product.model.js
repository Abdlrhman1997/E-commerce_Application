import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: [10, "too short product name"],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  priceAfterDiscount: {
    type: Number,
    default: 0,
    min: 0,
  },
  description: {
    type: String,
    maxlength: [
      100,
      "description should be less than or equal to 100 characters",
    ],
    minlength: [
      10,
      "description should be more than or equal to 10 characters",
    ],
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  sold: {
    type: Number,
    min: 0,
    default: 0,
  },
  imageCover: {
    type: String,
    // required:true,
  },
  images: {
    type: [String],
  },
  category: {
    type: Schema.ObjectId,
    ref: "category",
    required: true,
  },
  subcategory: {
    type: Schema.ObjectId,
    ref: "subcategory",
    required: true,
  },
  brand: {
    type: Schema.ObjectId,
    ref: "brand",
    required: true,
  },
  ratingAvg: {
    type: Number,
    min: 1,
    max: 5,
  },
  ratingCount: {
    type: Number,
    min: 0,
  },
});

const productModel = model("product", productSchema);

export default productModel;
