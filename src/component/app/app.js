import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import "./app.css";
import Header from "../header/Header";
import Products from "../products/Products.js";
import AdminPage from "../../pages/adminPage/AdminPage.js"

import { Slider } from "antd";
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import ProductPage from '../../pages/productPage.js'
import Search from "../search/Search.js"
import axios from "axios";
import { useRef } from "react";
import createPersistedState from "use-persisted-state";
const useCounterState = createPersistedState("count");
// app.use(cors());
function App(props) {

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

  const [userImage, setUserImage] = useState("");

  const fileInput = useRef();
  const uploadImage = () => {
    const uploadedFile = fileInput.current;
    axios.post("http://localhost:5000/upload", uploadedFile.files[0], {
      params: { filename: uploadedFile.files[0].name },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log("percentCompleted:", percentCompleted);
        setUserImage("http://localhost:5000/images/" + uploadedFile.files[0].name);
      },
    });
  };
  console.log(userImage);


  // giving the user the full list of the products

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
        {/* <div style={{ padding: "30px" }}>
          {product && product.title && <div> NEW PRODUCT ARRIVED! {product.title}</div>}
        </div> */}
        <br />
        <button onClick={uploadImage}>Upload  Image</button>
        <button onClick={getProducts}>get products list</button>
        <button onClick={() => setCount((currentCount) => currentCount + 1)}>{count}  increment saved on localstorage</button>
        {/* now i need to use this option to save on localstorage the users coose of products to bye so he won't loose his chooses from time to time/ i need to use this speacal state option on the buttons that count the bumbers in cartm,for example */}
        <ul id="products"></ul>

        <Search onSearch={userSearch} />
        <Switch>

          <Route exact path="/adminLogIn">
            <AdminPage />
            {/* i need to write crud component here */}
          </Route>

          <Route exact path="/">

            <Slider range defaultValue={[0, 100]} onChange={userRange} />
            <Products
              range={range} search={search}
              userImage={userImage}
            />
          </Route>

          <Route path="/:id">
            <ProductPage />
          </Route>


        </Switch>

      </div>

    </Router>
  );
};

export default App;
