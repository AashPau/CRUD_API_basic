const express = require("express");
require("dotenv").config();
const Product = require("./models/productModel.js");
const app = express();

app.use(express.json());

const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send("hello from the other side");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(process.env.DB_Connection)
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log("server is running on http://localhost:3000");
    });
  })
  .catch(() => {
    console.log("connection failed");
  });
