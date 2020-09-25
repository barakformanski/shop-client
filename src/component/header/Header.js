import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
// import 'ant-design-pro/dist/ant-design-pro.css';
// import Login from 'ant-design-pro/lib/Login';


function Header() {

    return (
        <div className="header">
            <div className="header_text">welcome to the our digital shop!
              <Link to="/adminLogIn">
                    <button className="login_button">admin acces</button>
                    {/* <Login /> */}
                </Link>
            </div>
        </div>
    )
}



export default Header;
