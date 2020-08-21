import React, { useState, useEffect } from "react";

import "./app.css";
import Header from "../header/Header";
import Products from "../products/Products.js";
import { Slider } from "antd";
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import ProductPage from '../../pages/productPage.js'
import Search from "../search/Search.js"
import { useRef } from "react";

function App() {
  const [range, setRange] = useState([0, 100]);
  let userRange = (value) => {
    setRange(value);
  }
  const [search, setSearch] = useState('');
  let userSearch = (value) => {
    setSearch(value);
    // console.log("value search:", value);
  };

  const App = () => {
    const fileInput = useRef();
    const uploadImage = () => {
      const uploadedFile = fileInput.current;

      axios.post("http://localhost:8000/upload", uploadedFile.files[0], {
        params: { filename: uploadedFile.files[0].name }
      });
    };

    return (
      <Router>
        <div className="app">


          <Header />

          <input type="file" ref={fileInput} />
          <br />
          <br />
          <button onClick={uploadImage}>Upload  Image</button>


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
