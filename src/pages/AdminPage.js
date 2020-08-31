import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';

const AdminPage = (props) => {
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
            <input type="text" ref={idTodelete} placeholder="של המוצר שברצונך למחוק id הכנס את ה" />
            <button className="send id" onClick={DeleteProduct}>לחץ כדי למחוק</button>
        </div>
    );

}
export default AdminPage;

