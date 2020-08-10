import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import Product from '../component/product/product.js'

const ProductPage = (props) => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        // const url = `https://quilt-flax-chemistry.glitch.me/products/${id}`
        const url = `http://localhost:3000/products/${id}`
        axios.get(url)
            .then(({ data }) => {
                setProduct(data)

            })
    }, [])

    return (
        product &&
        <div>
            <h1>{product.title}</h1>
            <img src={product.image} />
            <h2>description:</h2>
            <h2>  {product.description}</h2>
            <h2>price:{product.price}$</h2>



        </div>
    );
};

export default ProductPage;
