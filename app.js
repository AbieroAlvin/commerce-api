const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const authMiddleware = require("./auth/authMiddleware");

const productRoutes = require("./routes/productRoutes");

app.use(bodyParser.json());
// app.use(authMiddleware);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
