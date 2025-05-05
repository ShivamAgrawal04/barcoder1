import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getPublicProducts = asyncHandler(async (req, res) => {
  // const products = await Product.find({}).populate({
  //   path: "userId",
  //   match: { shopName: req.params.shopname },
  //   select: "shopName",
  // });

  // const filterProducts = products.filter((product) => product.userId);
  // if (filterProducts?.length > 0) {
  //   return res.json(
  //     new ApiResponse(200, "Products fetched successfully", filterProducts)
  //   );
  // } else {
  //   return res.json(new ApiResponse(404, "No products found"));
  // }

  const userId = req.params.shopname;
  const products = await Product.find({ userId });
  if (products?.length > 0) {
    return res.json(
      new ApiResponse(200, "Products fetched successfully", products)
    );
  } else {
    return res.json(new ApiResponse(404, "No products found"));
  }
});

export const getProducts = asyncHandler(async (req, res) => {
  const userId = req?.user?.id;

  const products = await Product.find({ userId });

  if (products?.length > 0) {
    return res.json(
      new ApiResponse(200, "Products fetched successfully", products)
    );
  } else {
    return res.json(new ApiResponse(404, "No products found"));
  }
});

export const addProduct = asyncHandler(async (req, res) => {
  const { name, price, category, availability, description } = req?.body;
  if (!name || !price || !category || !description) {
    throw new ApiError(400, "All fields are required");
  }

  let imageUrl = "";
  if (req.file) {
    imageUrl = req.file.path;
  }

  const product = await Product.create({
    name,
    price,
    category,
    availability,
    description,
    productPic: imageUrl,
    userId: req.user.id,
    shopName: req.user.shopName,
  });

  return res.json(new ApiResponse(200, "Product added successfully", product));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  let result = await Product.findByIdAndDelete({ _id: id });
  if (!result) throw new ApiError(400, "Product not found");
  return res.json(new ApiResponse(200, "Product deleted successfully", result));
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let result = await Product.findById(id);
  if (!result) throw new ApiError(400, "Product not found");
  return res.json(new ApiResponse(200, "Product fetched successfully", result));
});

export const updateProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, category, description } = req.body;
  const file = req?.file;

  let updateData = {};
  if (name) updateData.name = name;
  if (description) updateData.description = description;
  if (price) updateData.price = price;
  if (category) updateData.category = category;
  if (file) updateData.productPic = file.path;

  const updateProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updateProduct) throw new ApiError(400, "Product not found");

  return res.json(
    new ApiResponse(200, "Product updated successfully", updateProduct)
  );
});

// app.get("/products/:id", verifyToken, async (req, res) => {
//   let result = await _findOne({ _id: req.params.id });
//   if (result) {
//     res.send(result);
//   } else {
//     res.send({ result: "not found" });
//   }
// });

// app.put("/products/:id", verifyToken, async (req, res) => {
//   let result = await updateOne(
//     { _id: req.params.id },
//     {
//       $set: req.body,
//     }
//   );
//   res.send(result);
// });

// app.get("/search/:key", verifyToken, async (req, res) => {
//   let result = await find({
//     $or: [
//       { name: { $regex: req.params.key } },
//       // { price: { $regex: req.params.key } },
//       { category: { $regex: req.params.key } },
//       { company: { $regex: req.params.key } },
//     ],
//   });
//   res.send(result);
//   console.log(result);
// });

// // ✅ Ye new route bana
// // Route to get products based on adminId (from QR code scan)
// app.get("/qrproducts/:adminId", async (req, res) => {
//   try {
//     const adminId = req.params.adminId; // Get the adminId from the URL
//     const products = await find({ userId: adminId }); // Fetch products for that admin
//     if (products.length > 0) {
//       res.json(products); // Send back the products as JSON
//     } else {
//       res.status(404).json({ result: "No products found for this admin." });
//     }
//   } catch (error) {
//     res.status(500).send({ result: "Error fetching products" });
//   }
// });

// function verifyToken(req, resp, next) {
//   let token = req.headers["authorization"];

//   if (token) {
//     token = token.split(" ")[1]; // remove "Bearer"

//     verify(token, jwtKey, (error, decoded) => {
//       if (error) {
//         resp.status(401).send({ result: "Please provide valid token" });
//       } else {
//         console.log("Decoded Token ===>", decoded); // id mil raha
//         req.user = decoded; // ✅ yaha galti fix kar di
//         next();
//       }
//     });
//   } else {
//     resp.status(403).send({ result: "Please add token with header" });
//   }
// }
