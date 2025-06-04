import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    name: { type: String, lowercase: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    password: { type: String, select: false, trim: true },
    role: {
      type: String,
      default: "admin",
      enum: ["admin", "shopOwner", "customer"],
    },
    shopName: { type: String, lowercase: true, trim: true },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const User = model("User", userSchema);
export default User;
