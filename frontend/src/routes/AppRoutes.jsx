import React from 'react';
import { Route, Routes } from 'react-router';
import Home from '../pages/Home/Home';

const AppRoute = () => {
    return <Routes>
    <Route>
        <Route index element={<Home/>}></Route>
    </Route>
    </Routes>
};

export default AppRoute;