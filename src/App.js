import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { database } from "faker";

export default function App() {
  const [products, setProducts] = useState([
    {
      id: "",
      name: "",
      image: "",
      price: "",
    },
  ]);

  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function clickHandler() {
      try {
        setLoader(true);
        const getData = await axios.get("/api/products");
        const data = await getData.data.products;
        setLoader(false);
        console.log(data);

        setProducts((da) => [...da, ...data]);
      } catch (error) {
        console.log(error);
      }
    }
    clickHandler();
  }, []);
  return (
    <div className="App">
      {<div>{loader}</div>}
      {products.map((data, i) => (
        <div key={i} class="card">
          <span class="price-card-img">
            <img src={data.image} alt="" />
          </span>
          <div class="card-header">{data.name}</div>
          <div class="card-body">{data.price}</div>
          <div class="card-footer">
            <button class="primary-btn">Primary</button>
            <button class="secondary-btn">Secondary</button>
          </div>
        </div>
      ))}
    </div>
  );
}
