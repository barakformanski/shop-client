import React, { useRef } from "react";
import axios from 'axios';
import "./adminPage.css"

const AdminPage = (props) => {
    const title = useRef();
    const price = useRef();
    const description = useRef();
    const quantity = useRef();

    function addProduct() {
        const newProduct = {
            title: title.current.value,
            image: '',
            price: price.current.value,
            description: description.current.value,
            quantity: quantity.current.value,
            pdf_description: '',
        };
        console.log("newProduct:", newProduct);
        axios
            .post('http://127.0.0.1:5000/products', newProduct)
            .then((res) => {
                console.log("newProduct:", newProduct)
            });
    }

    const idTodelete = useRef();

    function DeleteProduct() {
        axios
            .delete(`http://127.0.0.1:5000/products/${idTodelete.current.value}`)
            .then((res) => {
                console.log(`product with id ${idTodelete.current.value} deleted`);
            });
    }

    return (
        <div className="adminPage">
            <div className="delete_product">
                <h1>מחיקת מוצר </h1>
                <input className="deletedProductInput" type="text" ref={idTodelete} placeholder="של המוצר שברצונך למחוק id הכנס את ה" />
                <button className="send id" onClick={DeleteProduct}>לחץ כדי למחוק</button>
            </div>
            <div className="newProductInPut">
                <h1>הוספת מוצר חדש</h1>
                <input
                    className="newProductTitle"
                    ref={title}
                    placeholder="שם הפריט "
                />

                <input
                    className="newProductQuantity"
                    ref={quantity}
                    placeholder="כמות במלאי"
                />
                <input
                    className="newProductPrice"
                    ref={price}
                    placeholder="מחיר "
                />
                <input
                    className="newProductDescription"
                    ref={description}
                    placeholder="מחיר "
                />
                <img
                    src=""
                />

            </div>
        </div>
    );

}

export default AdminPage;

