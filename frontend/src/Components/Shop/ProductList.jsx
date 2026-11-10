import React from 'react';
import Productitem from '../../Products/Productitem';

const ProductList = ({ products = [], loading }) => {
    if (loading)
        return (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-xs animate-pulse">
                        <div className="h-48 bg-gray-100 rounded-xl mb-4"></div>
                        <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-100 rounded w-full mb-4"></div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                            <div className="h-5 bg-gray-100 rounded w-16"></div>
                            <div className="h-8 bg-gray-100 rounded-lg w-20"></div>
                        </div>
                    </div>
                ))}
            </div>
        );

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {products?.map((product) => (
                <Productitem product={product} key={product.id} />
            ))}
        </div>
    );
};

export default ProductList;
