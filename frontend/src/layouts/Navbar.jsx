import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div>
           <Link to="/">Home</Link>
           <Link to="/products">Products</Link>
           <Link to="/about">About</Link>
           
        </div>
    );
};

export default Navbar;