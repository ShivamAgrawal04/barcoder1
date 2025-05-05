import { Schema, model } from "mongoose";
const productSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: { type: String, lowercase: true },
    description: { type: String, lowercase: true },
    price: { type: Number, required: true },
    category: { type: String, lowercase: true },
    productPic: { type: String, default: "" },
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = model("product", productSchema);
export default Product;
