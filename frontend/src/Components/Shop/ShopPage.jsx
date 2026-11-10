import React, { useEffect, useState } from 'react';
import apiClient from '../../Services/api-client';
import ProductList from './ProductList';
import Pagination from './Pagination';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [TotalPages,SetTotalPage]=useState(0);
    const [CurrentPage,SetCurrentPage]=useState(1);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct=()=>{
    setLoading(true);
        apiClient.get('/products')
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
                setProducts(data);
                SetTotalPage(Math.ceil(data.count/data.results.length));
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }
    return (
        <div className="w-full min-h-screen bg-white py-8 sm:py-12">
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
                <ProductList products={products} loading={loading} />
            </div>
                <Pagination TotalPages={TotalPages} CurrentPage={CurrentPage} handlePageChange={SetCurrentPage} />

        </div>
    );
};

export default ShopPage;
