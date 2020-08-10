import React from 'react';
// import Cart from '../cart/cart.js';

function CartWithProducts(props) {
    return (
        <div id={props.id}>
            <h2>Title: {props.title}</h2>

            <h3>Price: {props.price}</h3>

            <div>

                <img src={props.src} />

            </div>

            <div className="quantityInProductInCart">quantity: {props.quantity} </div>


            {/* need to abale those buttons && update the quantity from <Cart/> */}
            {/* <button onClick={add_to_cart, add_to_productsInCart}>add_to_cart</button>
          <button onClick={remove_from_cart}>remove_from_cart</button> */}
        </div>
    );

}
export default CartWithProducts;