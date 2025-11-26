import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

router.get("/products/:title", async (req, res) => {
  const { title } = req.params;
  let result;
  try {
    if (title.startsWith("Roasted")) {
      result = await db.query("select * from roasted_nuts");
    } else if (title.startsWith("Raw")) {
      result = await db.query("select * from raw_nuts");
    } else if (title.startsWith("Dates")) {
      result = await db.query("select * from dates");
    } else if (title.startsWith("Dried")) {
      result = await db.query("select * from driedfruits");
    } else if (title.startsWith("Candies")) {
      result = await db.query("select * from candiesandjellies");
    } else if (title.startsWith("Chocolate")) {
      result = await db.query("select * from chocolate_gifts");
    } else if (title.startsWith("Chinese")) {
      result = await db.query("select * from chinese");
    } else if (title.startsWith("Seeds")) {
      result = await db.query("select * from seeds");
    } else {
      return res.status(400).json({ message: "Invalid category" });
    }

    const products = result.rows.map((row) => ({
      ...row,
      image: row.image ? row.image.toString("base64") : null,
    }));
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
