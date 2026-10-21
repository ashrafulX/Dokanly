import React from 'react';
import CarouselSlide from '../Components/Carousel/CarouselSlide';
import HeroCarousel from '../Components/Carousel/HeroCarousel';
import Features from '../Components/Features';

const Home = () => {
    return (
        <div >
            <HeroCarousel/>
            <Features />
        </div>
    );
};

export default Home;