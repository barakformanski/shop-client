import React from "react";
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";

function Upload_component() {
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                console.log(info);

                console.log(info.file);
                console.log(info.file.name);

                axios.post("http://loacalhost:5000/upload", info.file, {
                    params: { filename: info.file.name }

                });

            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div>
            <Upload {...props}>
                <Button>
                    <UploadOutlined />select your favorite cart image
    </Button>
            </Upload>
            {/* <span>mountNode</span> */}
        </div>
    );
};
export default Upload_component;