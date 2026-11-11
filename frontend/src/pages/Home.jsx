import React from 'react';
import OllaHero from '../Components/Hero/OllaHero';
import Features from '../Components/Features';
import FlashSale from '../Components/Discount/FlashSale';
import Categories from '../Components/Category/Categories';
import Product from '../Components/Products/Product';

const Home = () => {
    return (
        <div className="w-full bg-white">
            {/* Olla Interactive 3D Dokanly Hero */}
            <OllaHero />

            {/* E-Commerce Trust Badges */}
            <Features />

            {/* Flash Sale Countdown Banner */}
            <FlashSale />

            {/* Live Backend Categories Grid */}
            <Categories />

            {/* Trending & Featured Products from Backend API */}
            <Product />
        </div>
    );
};

export default Home;
