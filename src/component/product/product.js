import React, { useState, useEffect, useContext } from "react";
import "./Product.css";
import Context from '../Context';

// import Cart from "../cart/cart";
// import Products from "../products/Products.js"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Product = (props) => {
  const [quantity, setquantity] = useState(props.quantity);
  const [checkIfClicked, setCheckIfClicked] = useState(true);
  const [quantityInCart, setQuantityInCart] = useState(0);
  const {
    productsFromDB, products, setProducts, cartCount, setCartCount, userSearch, setUserSearch, itemsInCart, setItemsInCart
  } = useContext(Context);


  const add_to_cart = () => {
    if (props.quantity) {
      setCartCount(cartCount + 1)
      setquantity(quantity - 1);

      if (checkIfClicked === true) {

        setItemsInCart(itemsInCart.concat([{ id: props.id, title: props.title, price: props.price, image: props.src, quantity: 1 }]));

        setCheckIfClicked(false);

      } else {

        const productIndex = itemsInCart.findIndex(product => product.id == props.id);
        let newItemsInCartArray = [...itemsInCart];
        newItemsInCartArray[productIndex] = { ...newItemsInCartArray[productIndex], quantity: itemsInCart[productIndex].quantity + 1 };
        setItemsInCart(newItemsInCartArray);
      };
    }
  }
  const remove_from_cart = () => {
    if
      (quantity + 1 === props.quantity) {

      setCartCount(cartCount - 1)

      removeFromCart()

    }
    else if
      (quantity < props.quantity) {

      setCartCount(cartCount - 1)
      setquantity(quantity + 1);
      const productIndex = itemsInCart.findIndex(product => product.id == props.id);
      let newItemsInCartArray = [...itemsInCart];
      newItemsInCartArray[productIndex] = { ...newItemsInCartArray[productIndex], quantity: itemsInCart[productIndex].quantity - 1 };
      setItemsInCart(newItemsInCartArray);

    }
  };


  const removeFromCart = () => {
    setItemsInCart(itemsInCart.filter((productToRemoveFromCart) =>
      props.id !== productToRemoveFromCart.id,
      setCheckIfClicked(true),
      setquantity(quantity + 1)

    ))
  };
  // מה שימוש של הuse efect הזה?
  useEffect(() => {
    setquantity(props.quantity);
  }
    , [props.quantity]
  )
  return (
    <div>
      <Link to={`${props.id}`}>
        <div>{props.title}</div>
        <div>ש"ח {props.price}</div>

        <div>

          <img src={props.src} />

        </div>
      </Link>
      <div className="quantity"> פריטים במלאי{quantity}</div>


      <button onClick={add_to_cart
      }>+</button>
      <button onClick={remove_from_cart}>-</button>
    </div>
  );
};

export default Product;
