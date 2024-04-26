const productModel = require("../models/productModel");

// Retrieves all products and sends them as a JSON response.
const getAllProducts = (req, res) => {
  const products = productModel.getAllProducts();
  res.json(products);
};

// Retrieves a single product by its ID and sends it as a JSON response. If the product is not found, it returns a 404 error.
const getProductById = (req, res) => {
  const product = productModel.getProductById(parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

// Creates a new product using the request body and sends the new product as a JSON response with a 201 status code.
const createProduct = (req, res) => {
  const newProduct = productModel.createProduct(req.body);
  res.status(201).json(newProduct);
};

//  Updates an existing product by its ID using the request body and sends the updated product as a JSON response. If the product is not found, it returns a 404 error.
const updateProduct = (req, res) => {
  const updatedProduct = productModel.updateProduct(
    parseInt(req.params.id),
    req.body
  );
  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(updatedProduct);
};

// Deletes a product by its ID and sends a 204 status code if successful. If the product is not found, it returns a 404 error.
const deleteProduct = (req, res) => {
  const success = productModel.deleteProduct(parseInt(req.params.id));
  if (!success) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(204).end();
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
