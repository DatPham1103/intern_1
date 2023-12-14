import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"

function Header() {
    return (
        <>
            <Menu
                className="header"
                theme="dark"
                mode="horizontal"
            >
                <Menu.Item key="home">
                    <Link to="/home">Home</Link>
                </Menu.Item>
                <Menu.Item key="product">
                <Link to="/product">Product</Link>
                    
                </Menu.Item>
                <Menu.Item key="management">
                <Link to="/management">Management</Link>
                </Menu.Item>
            </Menu>
        </>
    );
}

export default Header;
