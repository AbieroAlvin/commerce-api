const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/products.json");

// Reads the JSON file and returns an array of all products.
const getAllProducts = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

//  Finds and returns a product by its ID.
const getProductById = (id) => {
  const products = getAllProducts();
  return products.find((product) => product.id === id);
};

// Adds a new product to the JSON file and returns the new product.
const createProduct = (product) => {
  const products = getAllProducts();
  const newProduct = { id: products.length + 1, ...product };
  products.push(newProduct);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  return newProduct;
};

//  Updates an existing product in the JSON file and returns the updated product.
const updateProduct = (id, updatedProduct) => {
  const products = getAllProducts();
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex === -1) {
    return null;
  }
  const updatedProductWithId = { id, ...updatedProduct };
  products[productIndex] = updatedProductWithId;
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  return updatedProductWithId;
};

// Removes a product from the JSON file by its ID and returns true if successful.
const deleteProduct = (id) => {
  const products = getAllProducts();
  const updatedProducts = products.filter((product) => product.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2));
  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
