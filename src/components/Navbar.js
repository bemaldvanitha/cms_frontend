import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'antd';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <div>
                <Link to={'/dashboard'}>
                    <p className="navbar-header">Customer Management system</p>
                </Link>
            </div>
            <div>
                <Link to={'/create'}>
                    <Button type="primary" className="navbar-button">Add New Customer</Button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
