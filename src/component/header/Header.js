import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {

    return (
        <div className="header">
            <div className="header_text">welcome to the our digital shop!
              <Link to="/adminLogIn">
                    <button>enter as an admin</button>
                </Link>
            </div>
        </div>
    )
}



export default Header;
