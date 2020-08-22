import React, { useState, useEffect } from "react";

import "./app.css";
import Header from "../header/Header";
import Products from "../products/Products.js";
import { Slider } from "antd";
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import ProductPage from '../../pages/productPage.js'
import Search from "../search/Search.js"
import axios from "axios";
import { useRef } from "react";
import createPersistedState from "use-persisted-state";

function App() {
  const [count, setCount] = useCounterState(0);
  document.cookie = "isLogIn=1";
  document.cookie = "isLogIn=2";
  document.cookie = "username=3; expires= sun, 1 aug 2021; path=/login";
  console.log(document.cookie);
  // localStorage.setItem("check", JSON.stringify([
  //   {
  //     id: 1,
  //     title: "myProduct"
  //   }
  // ])
  // );
  const localStorageValue = ("localStorage:", JSON.parse(localStorage.getItem("check")));
  // console.log("localStorage:", localStorageValue[0].title);


  const [range, setRange] = useState([0, 100]);
  let userRange = (value) => {
    setRange(value);
  }
  const [search, setSearch] = useState('');
  let userSearch = (value) => {
    setSearch(value);
    // console.log("value search:", value);
  };


  const fileInput = useRef();
  const uploadImage = () => {
    const uploadedFile = fileInput.current;

    axios.post("http://localhost:5000/upload", uploadedFile.files[0], {
      params: { filename: uploadedFile.files[0].name }
    });
  };
  async function getProducts() {
    let data;
    try {
      ({ data } = await axios.get("http://localhost:5000/products"));
    } catch (e) {
      data = loadProducts();
    }
    const products = document.getElementById("products");
    data.forEach((product) => {
      const productLi = `<li>${product.title}</li>`;
      products.innerHTML += productLi;
    });
    saveProducts(data);
  }
  function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  function loadProducts() {
    const products = localStorage.getItem("products");
    return products ? JSON.parse(products) : [];
  }

  return (
    <Router>
      <div className="app">


        <Header />

        <input type="file" ref={fileInput} />
        <br />
        <br />
        <button onClick={uploadImage}>Upload  Image</button>
        <button onClick={getProducts}>get products list</button>
        <button onClick={() => setCount((currentCount) => currentCount + 1)}>increment saved on localstorage</button>
        <ul id="products"></ul>

        <Search onSearch={userSearch} />
        <Switch>

          <Route exact path="/">
            <Slider range defaultValue={[0, 100]} onChange={userRange} />
            <Products
              range={range} search={search} />
          </Route>

          <Route path="/:id">
            <ProductPage />
          </Route>
          {/* <Switch> */}
          {/* <Route exact path="/">
     <Products range={range} />
          </Route> */}
          {/* <Route path="/product/:id"> */}
          {/* <Product /> */}
          {/* </Route> */}
        </Switch>

      </div>
    </Router>
  );
};

export default App;
