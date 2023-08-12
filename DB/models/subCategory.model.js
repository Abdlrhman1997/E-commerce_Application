import { Schema, model } from "mongoose";

const subcategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: [2, "too short subcategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: Schema.ObjectId,
      required: true,
      ref: "category",
    },
  },
  { timestamps: true }
);

const subCategoryModel = model("subcategory", subcategorySchema);

export default subCategoryModel;
