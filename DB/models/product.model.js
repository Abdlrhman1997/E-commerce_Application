import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: [5, "too short product name"],
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
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.virtual("reviews", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});

productSchema.pre(/^find/, function () {
  this.populate("reviews");
});

productSchema.post("init", function (doc) {
  if (doc.imageCover) {
    doc.imageCover = process.env.BASE_URL + "product/" + doc.imageCover;
    doc.images = doc.images.map(
      (ele) => process.env.BASE_URL + "product/" + ele
    );
  }
});

const productModel = model("product", productSchema);

export default productModel;
