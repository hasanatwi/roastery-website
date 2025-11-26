import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Category from "./Category";
import Header from "./Header";

function DisplaySpecificProducts({ isValid2, nameOfTheUser }) {
  const { title } = useParams();
  const [products, setProducts] = useState([]);
  console.log("the value of isValid2 is:", isValid2);
  console.log("the value of nameOfTheUser is:", nameOfTheUser);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${title}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching specific products:", err));
  }, [title]);

  return (
    <div>
      <Header isValid2={isValid2} nameOfTheUser={nameOfTheUser} />
      <div className="displayProducts">
        <h1 className="Products">{title}</h1>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {products.map((product) => (
            <Category
              key={product.id}
              image={`data:image/jpeg;base64,${product.image}`}
              title={product.name_of_product}
              name_of_the_category={title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplaySpecificProducts;
