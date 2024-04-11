import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../config/actions/actions';
import { FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from '../config/actions/actionsCart';
import { LoadingAnimation } from './jsonAnimation';

const ProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [favorites, setFavorites] = useState([]);
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);

    useEffect(() => {
        dispatch(fetchProducts(productId));
    }, [dispatch, productId]);

    const toggleFavorite = (productId) => {
        if (favorites.includes(productId)) {
            setFavorites(favorites.filter(id => id !== productId));
        } else {
            setFavorites([...favorites, productId]);
            const productToAdd = products.find(product => product.id === Number(productId));
            if (productToAdd) {
                handleAddToCart(productToAdd);
            }
        }
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success("Product added to cart", {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    if (loading) {
        return <div>
            <LoadingAnimation />
        </div>;
    }

    const product = products.find((product) => product.id === Number(productId));

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className='bg-gray-0 min-h-screen'>
            <div className="flex justify-center items-center mt-8 ">
                <div className="p-8 max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:flex">
                    <div className="md:flex-shrink-0">
                        <img src={product.image} alt={product.title} className="h-100 w-100  md:w-96" />
                    </div>
                    <div className="p-9">
                        <div className="uppercase tracking-wide text-sm text-pink-500 font-semibold">{product.category}</div>
                        <h2 className="text-gray-800 text-3xl font-semibold">{product.title}</h2>
                        <h2 className='mt-9 underline text-pink-500'>Description</h2>
                        <p className="mt-2 text-gray-600 text-justify">{product.description}</p>
                        <div className="mt-4">
                            <span className="text-gray-900 font-semibold">Price:</span> ${product.price}
                        </div>
                        <div className="flex justify-end mt-5">
                            <button className='flex  items-center gap-3 p-3 bg-pink-500 rounded-lg text-white' onClick={() => toggleFavorite(product.id)}>Add to Cart
                                <FaHeart color="white" size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
        </div>
    );
};

export default ProductDetail;
