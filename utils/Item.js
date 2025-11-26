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

router.get("/item/:name_of_the_category/:title", async (req, res) => {
  const { name_of_the_category, title } = req.params;
  const { name, email } = req.query;
  let databaseTableName = "";
  if (name_of_the_category === "Candies and Jellies")
    databaseTableName = "candiesandjellies";
  else if (name_of_the_category === "Chinese") databaseTableName = "chinese";
  else if (name_of_the_category === "Chocolate Gifts")
    databaseTableName = "chocolate_gifts";
  else if (name_of_the_category === "Dates") databaseTableName = "dates";
  else if (name_of_the_category === "Raw Nuts") databaseTableName = "raw_nuts";
  else if (name_of_the_category === "Roasted Nuts")
    databaseTableName = "roasted_nuts";
  else if (name_of_the_category === "Dried Fruits")
    databaseTableName = "driedfruits";
  else if (name_of_the_category === "Seeds") databaseTableName = "seeds";
  let query;
  let result;
  if (title !== "Coffee") {
    query = `SELECT * FROM "${databaseTableName}" WHERE name_of_product = $1`;
    result = await db.query(query, [title]);
  } else if (title === "Coffee") {
    query = `SELECT * FROM coffee`;
    result = await db.query(query);
  }

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Product not found" });
  }

  const product = result.rows[0];

  let imageBase64 = null;
  if (product.image) {
    imageBase64 = Buffer.from(product.image).toString("base64");
  }

  res.json({
    ...product,
    image: imageBase64,
  });
});

router.get("/someEndpoint", async (req, res) => {
  const { title, totalWeight, totalPrice, email2, nameOfTheUser } = req.query;
  console.log("Received title: ", title);
  console.log("Received totalWeight: ", totalWeight);
  console.log("Received totalPrice: ", totalPrice);
  console.log("email2: ", email2);
  console.log("Received nameOfTheUser: ", nameOfTheUser);
  try {
    const insertQuery = `
            INSERT INTO Products (email, product, totalWeight, totalPrice,nameoftheuser)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

    const values = [email2, title, totalWeight, totalPrice, nameOfTheUser];

    const result = await db.query(insertQuery, values);

    res.json({
      success: true,
      message: "Product stored successfully",
      inserted: result.rows[0],
    });
  } catch (error) {
    console.error("Database insert error:", error);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

export default router;
