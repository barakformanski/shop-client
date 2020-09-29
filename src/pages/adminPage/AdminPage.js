import React, { useEffect, useRef, useContext, useState } from "react";
import axios from 'axios';
import "./adminPage.css";
import Products from "../../component/products/Products";
import socketIOClient from "socket.io-client";
import Context from '../../component/Context.js';

import { Form, Input, InputNumber, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;

const formItemLayout = {
    wrapperCol: {
        span: 5,
    },
};

const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};


const validateMessages = {
    required: "'${name}' זהו שדה חובה!",
};

const onFinish = (values) => {

    console.log('Received values of form: ', values);
    console.log(values.product.title);
    const newProduct = {
        title: values.product.title,
        image: values.product.iamge,
        price: values.product.price,
        description: values.product.description,
        quantity: values.product.quantity,
        pdf_description: values.product.pdf_description,
    };

    axios
        .post('http://127.0.0.1:5000/products', newProduct)
        .then((res) => {
            console.log("newProduct:", newProduct)
            console.log(res);
        });
}
const AdminPage = (props) => {
    const { products, setProducts, newProduct, deletedProduct } = useContext(Context);
    const idTodelete = useRef();
    const idToUpdate = useRef();




    console.log("data of deleted product", deletedProduct.title);

    function DeleteProduct() {
        console.log("idTodelete:", idTodelete.current.value);
        axios
            .delete(`http://127.0.0.1:5000/products/${idTodelete.current.value}`)
            .then((res) => {
                alert(`product with id ${idTodelete.current.value} deleted`);
            });
    }


    return (
        <div className="adminPage" dir="rtl">

            <div className="delete_product">
                <h1>מחיקת מוצר </h1>
                <input className="deletedProductInput" type="text" ref={idTodelete} placeholder="של המוצר שברצונך למחוק id הכנס את ה" />
                <button className="send id" onClick={DeleteProduct}>לחץ כדי למחוק</button>
                <Form.Item
                    name="select"
                    label="Select"
                    hasFeedback
                    rules={[{ required: true, message: 'Please select your country!' }]}
                >
                    <Select placeholder="Please select a country">
                        <Option value="china">China</Option>
                        <Option value="usa">U.S.A</Option>
                    </Select>
                </Form.Item>
            </div>
            <div className="update_quantity">
                <h1>עדכון מלאי מוצר </h1>
                <input className="deletedProductInput" type="text" ref={idToUpdate} placeholder="של המוצר שברצונך לעדכן id הכנס את ה" />
                <button className="send id" onClick={idToUpdate}>לחץ כדי לעדכן</button>
            </div>
            <div className="newProductInPut">
                <h1>הוספת מוצר חדש</h1>
                <Form
                    name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{
                        ['input-number']: 0
                    }}
                    validateMessages={validateMessages}



                >
                    <Form.Item
                        name={["product", "title"]}

                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder="כתוב את שם המוצר " />
                    </Form.Item>


                    <Form.Item
                        name={["product", "price"]}
                        key="מחיר המוצר"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber placeholder="מחיר המוצר" />
                    </Form.Item>




                    <Form.Item
                        name={["product", "image"]}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        getValueFromEvent={normFile}
                    >

                        <Upload.Dragger name="files" action="/upload.do">
                            <p className="ant-upload-drag-icon">
                                <UploadOutlined />
                            </p>
                            <p className="ant-upload-text">לחץ והוסף קובץ תמונה או גרור את הקובץ ישירות לתיבה זו</p>
                        </Upload.Dragger>
                    </Form.Item>

                    <Form.Item
                        name={["product", "quantity"]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber placeholder="כמות במלאי" />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            span: 6,
                            offset: 6,
                        }}
                    >
                        <Button type="primary" htmlType="submit" onClick={props.addProduct}>
                            שלח
          </Button>
                    </Form.Item>
                </Form>
                {/* <input
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
                /> */}

            </div>
        </div>
    );

}

export default AdminPage;

