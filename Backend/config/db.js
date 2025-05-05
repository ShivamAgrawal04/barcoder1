import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB connected");
  } catch (error) {
    console.log("mongoose error", error.message);
  }
};

export default connectDB;
