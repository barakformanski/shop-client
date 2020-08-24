import React, { useState, useEffect, useParams } from "react";
import "./products.css";

import Product from "../product/product.js";
import axios from "axios";
import Cart from "../cart/cart.js";
import createPersistedState from "use-persisted-state";
const useCounterStateOnCart = createPersistedState("count");
const useProductsState = createPersistedState("products");

const Products = (props) => {
  // const [products, setProducts] = useState([]);
  const [useProductsState, setProducts] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [userImage, setUserImage] = useState("/images/cart.jpg");
  console.log(props.userImage);
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
  console.log(useProductsState);


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
  return (
    <div className="products">


      {useProductsState
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

      />


    </div>
  );
};
export default Products;
