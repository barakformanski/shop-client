import React, { useState, useEffect, useParams } from "react";
import "./products.css";
import socketIOClient from "socket.io-client";

import Product from "../product/product.js";
import axios from "axios";
import Cart from "../cart/cart.js";
import createPersistedState from "use-persisted-state";
import { isElementOfType } from "react-dom/test-utils";
const useCounterStateOnCart = createPersistedState("count");
const useProductsState = createPersistedState("products");

const Products = (props) => {
  // const [products, setProducts] = useState([]);
  // const [useProductsState, setProducts] = useState([]);
  const [Products, setProducts] = useProductsState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [idProductFromSocketToChange, setidProductFromSocketToChange] = ('');
  useEffect(() => {
    setUserImage(props.userImage);
  }, [props.userImage]);
  console.log(userImage);

  // console.log(props.range);

  // console.log(products);
  // console.log(productsInCart);
  const search = props.search;

  useEffect(() => {
    const params = { search: search }
    axios.get("http://localhost:5000/products", { params: params })
      .then((res) => {
        // console.log(res);
        const productsArray = res.data;
        console.log(productsArray);
        setProducts(res.data);
      });
  }, [search]);
  console.log(Products);
  console.log(Products[0]);
  if (Products.length) {
    console.log(Products[0].id);

  }

  // console.log(useProductsState[0].id);

  // const [cart, setCart] = useState(0);
  // const add = (productId) => {
  //   // console.log("productId:", productId);
  //   setCart(cart + 1);
  // };
  const [cart, setCart] = useCounterStateOnCart(0);
  const add = (productId) => {
    // console.log("productId:", productId);
    setCart(cart + 1);
  };

  const remove = () => {
    if (cart) {
      setCart(cart - 1);
    }
  };

  // const [productQuantity, setProductQuantity] = useState();

  useEffect(() => {
    const socket = socketIOClient("http://localhost:5000");
    socket.on("quantity_updated", (data) => {
      console.log(data);
      console.log("id to update:", data.id);
      console.log("new quantity", data.quantity);
      const updatedProducts = Products.slice();
      // const updatedProducts = [...Products];
      console.log(updatedProducts);
      const productIndex = updatedProducts.findIndex((product) => product.id === data.id);
      updatedProducts[productIndex].quantity = data.quantity;
      console.log(updatedProducts);
      setProducts(updatedProducts);

    });
  }, []);
  return (
    <div className="products">


      {Products
        // .filter(
        //   (product) =>
        //     product.price >= props.range[0] && product.price <= props.range[1]
        // )
        .map((product) => (
          <div className="product" key={product.id}>
            <Product
              id={product.id}
              title={product.title}
              price={product.price}
              src={product.image}
              quantity={product.quantity}
              description={product.description}
              add={add}
              remove={remove}

              productsInCart={productsInCart}
              setProductsInCart={setProductsInCart}

            />
          </div>

        ))}

      <Cart cart={cart}
        productsInCart={productsInCart}
        userImage={userImage}

      />


    </div>
  );
};
export default Products;
