import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

function Search(props) {
    const { Search } = Input;

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );

    return (
        <div>
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                suffix={suffix}
                onSearch={props.onSearch}
            />
        </div>
        // document.getElementById('container'),
    )
}
export default Search;


