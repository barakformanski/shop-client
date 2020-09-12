import React, { useState, useEffect } from "react";
import "./Product.css";
import Cart from "../cart/cart";
import Products from "../products/Products.js"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Product = (props) => {
  const [quantity, setquantity] = useState(props.quantity);
  const [checkIfClicked, setCheckIfClicked] = useState(true);



  const add_to_cart = () => {
    if (quantity) {
      setquantity(quantity - 1);
      props.add(props.id);
      if (checkIfClicked === true) {

        props.setProductsInCart(props.productsInCart.concat([{ id: props.id, title: props.title, price: props.price, image: props.src }]));
        console.log(props.productsInCart);

        setCheckIfClicked(false);
      } else { };
    }
  };
  const remove_from_cart = () => {
    if (quantity < props.quantity) {
      setquantity(quantity + 1);
      props.remove();
    }
    else { setquantity(props.quantity) }
  };


  useEffect(() => {
    setquantity(props.quantity);
  }, [props.quantity]
  )
  return (
    <div>
      <Link to={`${props.id}`}>
        <h2>Title: {props.title}</h2>
        <h3>Price: {props.price}</h3>

        <div>

          <img src={props.src} />

        </div>
      </Link>
      <div className="quantity">quantity: {quantity} </div>


      <button onClick={add_to_cart
      }>add_to_cart</button>
      <button onClick={remove_from_cart}>remove_from_cart</button>
    </div>
  );
};

export default Product;
