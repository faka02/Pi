import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link className="h" to={'/home'}>
                <h2 className="home">Home</h2>
            </Link>
            
            <Link className="f" to={'/post'}><h2 className="form">Form</h2></Link>
        </div>
    )
}

export default Navbar