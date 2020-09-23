import React, { useContext } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Context from '../Context';

function Search(props) {

    const { Search } = Input;
    const userSearch2 = (check) => {
        console.log(check);
    }
    // const { userSearch, setUserSearch } = useContext(Context);
    const { setUserSearch } = useContext(Context);

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
                // onSearch={props.onSearch}
                onSearch={setUserSearch}
            // onSearch={userSearch2}

            />
        </div>
    )
}
export default Search;


