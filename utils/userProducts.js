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

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to DB:", err);
  } else {
    console.log("Connected to PostgreSQL");
  }
});


router.get("/userProducts", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }

  try {
    const query = `
      SELECT product, 
             SUM(totalweight)::numeric(10,2) AS totalweight, 
             SUM(totalprice)::numeric(10,2) AS totalprice
      FROM products
      WHERE LOWER(email) = LOWER($1)
      GROUP BY product
      ORDER BY product;
    `;

    const result = await db.query(query, [email]);

    console.log("Query result:", result.rows);

    res.json({
      success: true,
      products: result.rows,
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

export default router;
