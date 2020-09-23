import React, { useState, useRef } from "react";
import axios from "axios";
import "./uploadImage.css"

function UploadImage() {
    const [userImage, setUserImage] = useState("");


    const fileInput = useRef();
    const uploadImage = () => {
        const uploadedFile = fileInput.current;
        axios.post("http://localhost:5000/upload", uploadedFile.files[0], {
            params: { filename: uploadedFile.files[0].name },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                console.log("percentCompleted:", percentCompleted);
                setUserImage("http://localhost:5000/images/" + uploadedFile.files[0].name);
            },
        });
    };
    console.log(userImage);

    return (
        <div>
            <input type="file" ref={fileInput} />

            <button onClick={uploadImage}>Upload  Image</button>
        </div>
    )
};

export default UploadImage;
