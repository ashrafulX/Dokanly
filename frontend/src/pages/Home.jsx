import React from 'react';
import HeroCarousel from '../Components/Carousel/HeroCarousel';
import Features from '../Components/Features';
import Product from '../Products/Product';
import DiscountSections from '../Components/Discount/DiscountSections';
import Categories from '../Components/Category/Categories';
import CategoryItems from '../Components/Category/CategoryItems';

const Home = () => {
    return (
        <div className="bg-white">
            <HeroCarousel />
            <Features />
            <Categories />
            <Product />
            <DiscountSections />
        </div>
    );
};

export default Home;