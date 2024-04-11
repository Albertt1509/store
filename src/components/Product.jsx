import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, filterByCategory, sortByAlphabet, sortByPrice, searchProducts } from '../config/actions/actions'; // Import searchProducts action
import { addToCart } from '../config/actions/actionsCart';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CgMenuMotion } from 'react-icons/cg'
import { ToastContainer, toast } from 'react-toastify';
import Loading from './Loading';

const ProductList = () => {
    const products = useSelector((state) => state.products.products);
    const filteredProducts = useSelector((state) => state.products.filteredProducts);
    const loading = useSelector((state) => state.products.loading);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        dispatch(searchProducts(searchTerm));
    }, [dispatch, searchTerm]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleFilterByCategory = (category, sortOrder) => {
        setSelectedCategory(category);
        dispatch(filterByCategory(category));
        dispatch(sortByAlphabet(sortOrder));
    };

    const handleSortByAlphabet = (order) => {
        setSortOrder(order);
        dispatch(sortByAlphabet(order));
        dispatch(filterByCategory(selectedCategory, order));
    };

    const handleSortByPrice = (order) => {
        setSortOrder(order);
        dispatch(sortByPrice(order));
        dispatch(filterByCategory(selectedCategory, order));
    };

    if (loading) {
        return <div><Loading /></div>;
    }

    const toggleFavorite = (productId) => {
        if (favorites.includes(productId)) {
            setFavorites(favorites.filter(id => id !== productId));
        } else {
            setFavorites([...favorites, productId]);
            handleAddToCart(products.find(product => product.id === productId));
        }
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success("Product Add to Cart", {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : products;

    return (
        <div className='bg-gray-50 min-h-screen'>
            <div className="flex gap-3 p-8">
                <input type="text" placeholder="Search Product Here" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="h-10 px-3 pr-10 focus:outline-none bg-transparent border-b-2 border-pink-500 text-black " />
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="sm:hidden border p-2 rounded-lg flex ml-auto transition-transform duration-00 transform hover:scale-105"
                >
                    <CgMenuMotion />
                </button>
            </div>
            {showFilter && (
                <div className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 transition-transform duration-300 transform translate-y-0 bg-white">
                    <div className="p-3 grid grid-cols-1 shadow-sm mx-auto">
                        <div className="Category grid grid-cols-2 gap-4">
                            <h3 className="font-semibold col-span-2">Filter by Category</h3>
                            <button className={`px-4 py-2 text-black rounded-md text-left ${selectedCategory === null ? 'text-pink-500' : ''}`} onClick={() => handleFilterByCategory(null, sortOrder)}>
                                All
                            </button>
                            {['jewelery', 'electronics', "men's clothing", "women's clothing"].map((category) => (
                                <button key={category} className={`px-4 py-2 text-black rounded-md text-left ${selectedCategory === category ? 'text-pink-500' : ''}`} onClick={() => handleFilterByCategory(category, sortOrder)}>
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-4 justify-center items-center">
                            <div className="Price">
                                <h3 className="font-semibold mt-4">Sort by Price:</h3>
                                <select
                                    value={sortOrder || ''}
                                    onChange={(e) => handleSortByAlphabet(e.target.value)}
                                    className="h-10 px-3 pr-10  focus:outline-pink-500 bg-transparent border-b border-pink-500 text-black "
                                >
                                    <option value="">None</option>
                                    <option value="az">A-Z</option>
                                    <option value="za">Z-A</option>
                                </select>
                            </div>
                            <div className="Name">
                                <h3 className="font-semibold mt-4">Sort by Name:</h3>
                                <select
                                    value={sortOrder || ''}
                                    onChange={(e) => handleSortByPrice(e.target.value)}
                                    className="h-10 px-3 pr-10  focus:outline-pink-500 bg-transparent border-b border-pink-500 text-black "
                                >
                                    <option value="">None</option>
                                    <option value="asc">Low to High</option>
                                    <option value="desc">High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-4 gap-4 p-8 ">
                {/* filter category */}
                <div className="hidden border p-8 h-[540px] rounded-lg sm:block col-span-1 mb-4 shadow-sm bg-white">                    <div className="flex flex-col gap-2">
                    <button className={`px-4 py-2 text-black rounded-md text-left ${selectedCategory === null ? 'text-pink-500' : ''}`} onClick={() => handleFilterByCategory(null, sortOrder)}>
                        All
                    </button>
                    {['jewelery', 'electronics', "men's clothing", "women's clothing"].map((category) => (
                        <button key={category} className={`px-4 py-2 text-black rounded-md text-left ${selectedCategory === category ? 'text-pink-500' : ''}`} onClick={() => handleFilterByCategory(category, sortOrder)}>
                            {category}
                        </button>
                    ))}
                </div>
                    <div className="mt-5">
                        <h2 className="text-lg font-semibold mb-4">Filter by Alphabet</h2>
                        <select
                            value={sortOrder || ''}
                            onChange={(e) => handleSortByAlphabet(e.target.value)}
                            className="h-10 px-3 pr-10  focus:outline-pink-500 bg-transparent border-b border-pink-500 text-black "
                        >
                            <option value="">None</option>
                            <option value="az">A-Z</option>
                            <option value="za">Z-A</option>
                        </select>
                    </div>
                    <div className="mt-5">
                        <h2 className="text-lg font-semibold mb-4">Sort by Price</h2>
                        <select
                            value={sortOrder || ''}
                            onChange={(e) => handleSortByPrice(e.target.value)} // Trigger sorting by price
                            className="h-10 px-3 pr-10  focus:outline-pink-500 bg-transparent border-b border-pink-500 text-black "
                        >
                            <option value="">None</option>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </select>

                    </div>
                </div>
                {/* Product list */}
                <div className="col-span-4 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 ">
                    {/* Product list */}
                    {productsToDisplay.map((product) => (
                        <div key={product.id} className="border p-4 relative shadow-sm rounded-lg w-full h-[320px] bg-white">
                            <Link to={`/product/${product.id}`}>
                                <div className="">
                                    <img src={product.image} alt={product.title} className="mx-auto max-w-full h-24" />
                                    <p className='text-pink-500 font-semibold'>{product.category}</p>
                                    <h3>{product.title}</h3>
                                    <p className="">Price: ${product.price}</p>
                                </div>
                            </Link>
                            <button className="absolute top-0 right-0 mt-2 mr-2 p-2" onClick={() => toggleFavorite(product.id)}>
                                <FaHeart color={favorites.includes(product.id) ? '#ec4899' : 'gray'} size={20} />
                            </button>
                        </div>
                    ))}
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ProductList;
