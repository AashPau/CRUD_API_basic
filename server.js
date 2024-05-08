import express from "express";
import "dotenv/config";
import Product from "./models/productModel.js";
import { Connect_DB } from "./util/Connect_DB";
const app = express();
Connect_DB();

app.use(express.json());

const port = process.env.PORT || 8000;

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

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
