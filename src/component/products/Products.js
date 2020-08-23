import React, { useState, useEffect, useParams } from "react";
import "./products.css";

import Product from "../product/product.js";
import axios from "axios";
import Cart from "../cart/cart.js";
import createPersistedState from "use-persisted-state";
const useCounterStateOnCart = createPersistedState("count");

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);


  // console.log(props.range);
  // console.log(products);
  // console.log(productsInCart);
  const search = props.search;

  useEffect(() => {
    const params = { search: search }
    axios

      // .get("https://quilt-flax-chemistry.glitch.me/products/")
      .get("http://localhost:5000/products", { params: params })
      .then((res) => {
        // console.log(res);
        const productsArray = res.data;
        console.log(productsArray);
        setProducts(res.data);
        console.log(products);

        setProducts(res.data);
        console.log(productsArray);

        console.log(products);
      });
  }, [search]);
  console.log(products);


  const [cart, setCart] = useState(0);
  const add = (productId) => {
    console.log(productId);
    setCart(cart + 1);
  };

  const remove = () => {
    if (cart) {
      setCart(cart - 1);
    }
  };
  return (
    <div className="products">


      {products
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
