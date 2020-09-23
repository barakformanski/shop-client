import React, { useState, useEffect, useContext } from "react";
// import Products from "../products/Products.js";
import "./cart.css";
import CartWithProdcts from "../cartwithproducts/CartWithProducts.js";
import UploadImage from "../uploadComponent/Uploadimage.js";
import Context from '../Context';

function Cart(props) {
  const {
    productsFromDB, products, setProducts, userSearch, setUserSearch, cartCount, setCartCount, itemsInCart, setItemsInCart, quantityInCart, setQuantityInCart
  } = useContext(Context);

  const defultCartImage = '../../images/cart.jpg';
  // console.log("defultCartImage:", defultCartImage);
  const [cartImage, setCartImage] = useState('');


  useEffect(() => {
    setCartImage(props.userImage);
  }, [props.userImage]);

  // console.log(cartImage);
  console.log('itemsInCart:', itemsInCart);
  return (
    <div className="cart">

      <div className="cartHeader">
        <span>your cart</span>
        {cartImage ? < img src={cartImage} /> :
          <img className="userCartImage" src={defultCartImage} />}
        <div className="cartNumber"> number of products: {cartCount}</div>
        <div> <UploadImage /> </div>

      </div>
      <div className="productsInCart">
        <div>
          {itemsInCart.map((itemInCart) =>
            <CartWithProdcts
              id={itemInCart.id}
              title={itemInCart.title}
              price={itemInCart.price}
              src={itemInCart.image}
              quantity={itemInCart.quantity}
            />
          )}
        </div>
      </div>
    </div>




  );
}

export default Cart;
