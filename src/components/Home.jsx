import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../config/actions/actions';
import { Link } from 'react-router-dom';
import Cover from '../img/bg.jpg';
import { FaHeart } from 'react-icons/fa';
const ProductList = () => {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const [isResponsive, setIsResponsive] = useState(false);
    useEffect(() => {
        dispatch(fetchProducts());
        const handleResize = () => {
            setIsResponsive(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);
    if (loading) {
        return <div>Loading...</div>;
    }
    const getOneProductByCategory = (category) => {
        return products.find((product) => product.category === category);
    };

    return (
        <>
            <div className="flex relative">
                <img src={Cover} alt="Cover" className='object-cover w-full opacity-80' />
                {!isResponsive && (
                    <div className="absolute bottom-8 left-8 text-center md:text-left">
                        <h1 className="text-red-500 text-4xl">Sakura Blossom</h1>
                        <p className="text-red-500 text-sm">Your Desires Await!</p>
                        <hr className=' border-b-4 border-red-500 ' />
                    </div>
                )}
            </div>
            {isResponsive && (
                <div className="bg-pink-500 w-full p-4">
                    <h1 className='text-white text-4xl text-center'>Sakura Blossom</h1>
                    <p className="text-white text-sm text-center">Your Desires Await!</p>
                </div>
            )}
            <div className="mx-auto md:flex mt-8 ml-8">
                <h1 className='font-semibold'>All Good Product in Here</h1>
            </div>
            <div className="">
                <div className="grid grid-cols-1s sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols- gap-4 p-8">
                    <div className="border p-4 rounded-lg shadow-lg text-center">
                        {getOneProductByCategory("men's clothing") && (
                            <div className="relative">
                                <Link to={`/product/${getOneProductByCategory("men's clothing").id}`}>
                                    <img src={getOneProductByCategory("men's clothing").image} alt={getOneProductByCategory("men's clothing").title} className="mx-auto max-w-full h-32" />
                                    <h3 className="mt-2">{getOneProductByCategory("men's clothing").title}</h3>
                                    <p className="text-sm font-semibold">Price: {getOneProductByCategory("men's clothing").price}</p>
                                </Link>
                                <button className="absolute top-0 right-0  mr-2 p-2 bg-white rounded-full">
                                    <FaHeart className="text-gray-500" size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="border p-4 rounded-lg shadow-lg text-center">
                        {getOneProductByCategory("women's clothing") && (
                            <div className="relative">
                                <Link to={`/product/${getOneProductByCategory("women's clothing").id}`}>
                                    <img src={getOneProductByCategory("women's clothing").image} alt={getOneProductByCategory("women's clothing").title} className="mx-auto max-w-full h-32" />
                                    <h3 className="mt-2">{getOneProductByCategory("women's clothing").title}</h3>
                                    <p className="text-sm font-semibold">Price: {getOneProductByCategory("women's clothing").price}</p>
                                </Link>
                                <button className="absolute top-0 right-0  mr-2 p-2 bg-white rounded-full">
                                    <FaHeart className="text-gray-500" size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="border p-4 rounded-lg shadow-lg text-center">
                        {getOneProductByCategory("jewelery") && (
                            <div className="relative">
                                <Link to={`/product/${getOneProductByCategory("jewelery").id}`}>
                                    <img src={getOneProductByCategory("jewelery").image} alt={getOneProductByCategory("jewelery").title} className="mx-auto max-w-full h-32" />
                                    <h3 className="mt-2">{getOneProductByCategory("jewelery").title}</h3>
                                    <p className="text-sm font-semibold">Price: {getOneProductByCategory("jewelery").price}</p>
                                </Link>
                                <button className="absolute top-0 right-0  mr-2 p-2 bg-white rounded-full">
                                    <FaHeart className="text-gray-500" size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="border p-4 rounded-lg shadow-lg text-center">
                        {getOneProductByCategory("electronics") && (
                            <div className="relative">
                                <Link to={`/product/${getOneProductByCategory("electronics").id}`}>
                                    <img src={getOneProductByCategory("electronics").image} alt={getOneProductByCategory("electronics").title} className="mx-auto max-w-full h-32" />
                                    <h3 className="mt-2">{getOneProductByCategory("electronics").title}</h3>
                                    <p className="text-sm font-semibold">Price: {getOneProductByCategory("electronics").price}</p>
                                </Link>
                                <button className="absolute top-0 right-0  mr-2 p-2 bg-white rounded-full">
                                    <FaHeart className="text-gray-500" size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-end mb-4 mr-8">
                <Link to={'/product'} className="bg-pink-500 text-white py-2 px-4 rounded-lg shadow-md ml-4">
                    View All Products
                </Link>
            </div>
        </>
    );
};

export default ProductList;
