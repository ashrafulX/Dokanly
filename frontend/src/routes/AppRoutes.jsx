import React from 'react';
import { Route, Router, Routes } from 'react-router';
import Home from '../pages/Home/Home';
import About from '../About';
import MainLayout from '../layouts/MainLayout';
import Product from '../pages/Products/Product';

const AppRoute = () => {
    return (
        <Routes>
            <Route  element={<MainLayout/>}>
                <Route path='/' element={ <Home /> } />
                <Route path='products' element={ <Product/> } />
                <Route path='about' element={ <About/> }/>

            </Route>
        </Routes>
    );
};

export default AppRoute;