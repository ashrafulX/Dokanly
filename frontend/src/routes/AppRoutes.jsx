import React from 'react';
import { Route, Router, Routes } from 'react-router';
import Home from '../pages/Home';
import About from '../pages/About';
import MainLayout from '../layouts/MainLayout';


const AppRoute = () => {
    return (
        <Routes>
            <Route  element={<MainLayout/>}>
                <Route path='/' element={ <Home /> } />
                    
                <Route path='about' element={ <About/> }/>

            </Route>

        </Routes>
    );
};

export default AppRoute;