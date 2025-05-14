import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, shopName } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new ApiError(400, "User already exist");
  }
  if (!name || !email || !password || !shopName) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.create({ name, email, password, shopName });
  const newUser = user.toJSON();
  delete newUser.password;
  return res.json(new ApiResponse(200, "User created successfully", newUser));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "All fields are required");

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  if (password !== user.password) {
    throw new ApiError(400, "Password is incorrect anurag bsdka");
  }

  const token = user.generateToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  const newUser = user.toJSON();
  delete newUser.password;

  return res.json(
    new ApiResponse(200, "User logged in successfully", {
      token,
      newUser,
    })
  );
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
  return res.json(new ApiResponse(200, "User logged out successfully"));
});

export const profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  return res.json(new ApiResponse(200, "User profile", user));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  // first check email present in the db or not
  // second ifExist then send the otp on the mail
  // third if otp is correct then change the mail option
  // after that change the mail then send to otp on the new mail
  // then update the email
});

export const auth = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  return res.json(new ApiResponse(200, "User is authenticated", user));
});
