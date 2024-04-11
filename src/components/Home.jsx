import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../config/actions/actions';
import { Link } from 'react-router-dom';
import Cover from '../img/bg.jpg';
import { FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { addToCart } from '../config/actions/actionsCart';
import Loading from './Loading';

const ProductList = () => {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const [favorites, setFavorites] = useState([]);
    const [likedProducts, setLikedProducts] = useState([]);
    const loading = useSelector((state) => state.products.loading);
    const [isResponsive, setIsResponsive] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());

        const handleResize = () => {
            setIsResponsive(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    const toggleFavorite = (productId) => {
        if (favorites.includes(productId)) {
            setFavorites(favorites.filter((id) => id !== productId));
            setLikedProducts(likedProducts.filter((id) => id !== productId));
        } else {
            setFavorites([...favorites, productId]);
            setLikedProducts([...likedProducts, productId]);
            const productToAdd = products.find((product) => product.id === Number(productId));
            if (productToAdd) {
                handleAddToCart(productToAdd);
            }
        }
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success('Product added to cart', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    const getOneProductByCategory = (category) => {
        return products.find((product) => product.category === category);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <img src={Cover} alt="Cover" className="object-cover w-full" />
            <div className="relative">
                {!isResponsive && (
                    <div className="absolute bottom-8 left-8 text-left">
                        <h1 className="text-red-500 text-4xl">Sakura Blossom</h1>
                        <p className="text-red-500 text-sm">Your Desires Await!</p>
                        <hr className="border-b-4 border-red-500" />
                    </div>
                )}
            </div>
            <div className="bg-pink-500 w-full p-4 md:hidden">
                <h1 className="text-white text-4xl text-center">Sakura Blossom</h1>
                <p className="text-white text-sm text-center">Your Desires Await!</p>
            </div>
            <div className="mx-auto md:flex mt-8 ml-8">
                <h1 className="font-semibold">All Good Product in Here</h1>
            </div>
            <div className="">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols- gap-4 p-8">
                    {['men\'s clothing', 'women\'s clothing', 'jewelery', 'electronics'].map((category) => (
                        <div key={category} className="border p-4 rounded-lg shadow-lg text-center bg-white">
                            {getOneProductByCategory(category) && (
                                <div className="relative">
                                    <Link to={`/product/${getOneProductByCategory(category).id}`}>
                                        <img
                                            src={getOneProductByCategory(category).image}
                                            alt={getOneProductByCategory(category).title}
                                            className="mx-auto max-w-full h-32"
                                        />
                                        <h3 className="mt-2">{getOneProductByCategory(category).title}</h3>
                                        <p className="text-sm font-semibold">Price: {getOneProductByCategory(category).price}</p>
                                    </Link>
                                    <button
                                        className="absolute top-0 right-0 mr-2 p-2 bg-white rounded-full"
                                        onClick={() => toggleFavorite(getOneProductByCategory(category).id)}
                                    >
                                        <FaHeart
                                            className={`text-${likedProducts.includes(getOneProductByCategory(category).id) ? 'pink' : 'gray'}-500`}
                                            size={20}
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end mb-4 mr-8">
                <Link to={'/product'} className="bg-pink-500 text-white py-2 px-4 rounded-lg shadow-md ml-4">
                    View All Products
                </Link>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProductList;
