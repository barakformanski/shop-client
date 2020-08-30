import React, { useState, useEffect } from "react";
import Products from "../products/Products.js";
import "./cart.css";
import CartWithProdcts from "../cartwithproducts/CartWithProducts.js";

function Cart(props) {

  const defultCartImage = '../../images/cart.jpg';
  console.log("defultCartImage:", defultCartImage);
  const [cartImage, setCartImage] = useState('');


  useEffect(() => {
    setCartImage(props.userImage);
  }, [props.userImage]);
  console.log(cartImage);
  return (
    <div className="cart">
      <div className="cartHeader">
        <span>your cart</span>
        {cartImage ? < img src={cartImage} /> :
          <img className="userCartImage" src={defultCartImage} />}
        <div className="cartNumber"> number of products: {props.cart}</div>

      </div>
      <div className="productsInCart">
        <div>
          {props.productsInCart.map((productInCart) =>
            <CartWithProdcts
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
