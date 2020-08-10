import React, { useState, useEffect } from "react";
import Products from "../products/Products.js";
import "./cart.css";
import CartWithProducts from "../cartwithproducts/CartWithProducts.js";
import Upload_component from "./upload/Upload_component.js";


function Cart(props) {
  return (
    <div className="cart">
      <div className="cartHeader">
        <Upload_component />
        <img className="cartImage" src='/images/cart.jpg' />your cart

        <div className="cartNumber"> number of products: {props.cart}</div>

      </div>
      <div className="productsInCart">
        <div>
          {props.productsInCart.map((productInCart) =>
            <CartWithProducts
              id={productInCart.id}
              title={productInCart.title}
              price={productInCart.price}
              src={productInCart.image}
              quantity={productInCart.quantity}
            />
          )}
        </div>
      </div>
    </div>




  );
}

export default Cart;
