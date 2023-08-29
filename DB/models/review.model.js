import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    product: {
      type: Schema.ObjectId,
      ref: "product",
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    rate: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
  },
  { timestamps: true }
);

// reviewSchema.pre(["find", "findOne"], function () {
//   this.populate("user", "name -_id");
// }); ==

reviewSchema.pre(/^find/, function () {
  this.populate("user", "name -_id");
});
const reviewModel = model("review", reviewSchema);

export default reviewModel;
