import React, { useState, useEffect, useContext } from "react";
import "./products.css";
import socketIOClient from "socket.io-client";

import Product from "../product/product.js";
import axios from "axios";
import Cart from "../cart/cart.js";
import createPersistedState from "use-persisted-state";
import Context from '../Context';
// import { isElementOfType } from "react-dom/test-utils";


// const useCounterStateOnCart = createPersistedState("count");
// const useProductsState = createPersistedState("products");

const Products = (props) => {
  const {
    products, setProducts, userSearch, deletedProduct, setUserSearch, itemsInCart, setItemsInCart, newProduct, setNewProduct
  } = useContext(Context);

  // const [products, setProducts] = useState([]);
  // const [useProductsState, setProducts] = useState([]);
  // מה זה usestate? לחזור!
  // const [productsInCart, setProductsInCart] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [idProductFromSocketToChange, setidProductFromSocketToChange] = ('');




  useEffect(() => {
    axios.get(`http://localhost:5000/products`)
      .then((res) => {
        // console.log("res:", res);
        // console.log("res.data:", res.data);
        const productsarray = res.data;
        // products = res.data;
        // console.log("products:", products);
        setProducts(productsarray);

      });
  }, []);
  console.log("products:", products);


  useEffect(() => {
    axios.get(`http://localhost:5000/products`)
      .then((res) => {
        // console.log("res:", res);
        // console.log("res.data:", res.data);
        const productsarray = res.data;
        // products = res.data;
        // console.log("products:", products);
        setProducts(productsarray);

      });
  }, [deletedProduct, newProduct]);
  console.log("products:", products);



  // לא מוכן search
  useEffect(() => {
    axios.get(`http://localhost:5000/products/search`)
      .then((res) => {
        console.log(res);
        console.log(userSearch);

        // products = res.data;
        console.log(products);
        setProducts(res.data);
      });
  }, []);



  useEffect(() => {
    setUserImage(props.userImage);
  }, [props.userImage]);
  console.log(userImage);






  useEffect(() => {
    const socket = socketIOClient("http://localhost:5000");
    socket.on("product_updated", (data) => {
      console.log('data product to update:', data);
      console.log("id to update:", data.id);
      console.log("new quantity", data.quantity);
      const updatedProducts = products.slice();
      // const updatedProducts = [...Products];
      console.log("updatedProducts array after product updated:", updatedProducts);
      const productIndex = updatedProducts.findIndex((product) => product.id === data.id);
      updatedProducts[productIndex].quantity = data.quantity;
      console.log(updatedProducts);
      setProducts(updatedProducts);
    });

    socket.on("product_updated", (data) => {
      setProducts(data);

    })

  }, []);
  return (
    <div className="products">


      {
        products
          // .filter(
          //   (product) =>
          //     product.price >= props.range[0] && product.price <= props.range[1]
          // )
          .map((product) => (
            <div className="product" >
              <Product
                key={product._id}
                id={product._id}
                title={product.title}
                price={product.price}
                src={product.image}
                quantity={product.quantity}
                description={product.description}
                itemsInCart={itemsInCart}
                setItemsInCart={setItemsInCart}

              />
            </div>

          ))
      }

      <Cart
        // cartCount={cartCount}
        // itemsInCart={itemsInCart}
        userImage={userImage}

      />


    </div >
  );
};
export default Products;
