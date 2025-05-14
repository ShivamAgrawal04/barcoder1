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
    productPic: {
      type: String,
      default:
        "https://res.cloudinary.com/epicplayers/image/upload/v1747212961/Barcoder/nz2napbkyx7gyjdnfpsa.png",
    },
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = model("product", productSchema);
export default Product;
