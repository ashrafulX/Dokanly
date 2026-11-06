import React from 'react';
import { FiShoppingBag, FiTruck, FiShield } from 'react-icons/fi';
import { Link } from 'react-router';

const About = () => {
    const values = [
        {
            icon: <FiShoppingBag className="w-5 h-5 text-red-600" />,
            title: 'Curated Selection',
            description: 'Every product is handpicked and verified to meet our high quality standards.',
        },
        {
            icon: <FiShield className="w-5 h-5 text-red-600" />,
            title: 'Buyer Protection',
            description: 'Secure payments, authentic products, and hassle-free 30-day returns.',
        },
        {
            icon: <FiTruck className="w-5 h-5 text-red-600" />,
            title: 'Fast Reliable Shipping',
            description: 'Prompt order processing and reliable doorstep delivery nationwide.',
        },
    ];

    return (
        <div className="w-full bg-white py-12 sm:py-16">
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 space-y-12">
                
                {/* Hero / Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
                        About Us
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Welcome to Dokan<span className="text-red-600">ly</span>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                        Dokanly is a modern e-commerce platform dedicated to providing quality lifestyle, technology, and fashion essentials with a clean and seamless shopping experience.
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {values.map((v, i) => (
                        <div 
                            key={i}
                            className="p-6 rounded-xl bg-white border border-gray-200 hover:border-red-300 transition-all text-center flex flex-col items-center"
                        >
                            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mb-4">
                                {v.icon}
                            </div>
                            <h3 className="text-base font-bold text-gray-900">
                                {v.title}
                            </h3>
                            <p className="mt-1.5 text-xs sm:text-sm text-gray-500 leading-relaxed">
                                {v.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Back to Home CTA */}
                <div className="text-center pt-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
                    >
                        <span>Start Shopping</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default About;