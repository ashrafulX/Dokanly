import React from 'react';
import HeroCarousel from '../Components/Carousel/HeroCarousel';
import Features from '../Components/Features';
import Product from '../Products/Product';

const Home = () => {
    return (
        <div className="bg-white">
            <HeroCarousel />
            <Features />
            <Product />
        </div>
    );
};

export default Home;