import React from 'react';
import { Route, Router, Routes } from 'react-router';
import Home from '../pages/Home';
import About from '../pages/About';
import MainLayout from '../layouts/MainLayout';
import Shop from '../pages/Shop';


const AppRoute = () => {
    return (
        <Routes>
            <Route  element={<MainLayout/>}>
                <Route path='/' element={ <Home /> } />
                    
                <Route path='about' element={ <About/> }/>
                <Route path='shop' element={<Shop/>}/>

            </Route>

        </Routes>
    );
};

export default AppRoute;