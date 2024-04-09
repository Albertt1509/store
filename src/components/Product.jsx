import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, } from '../config/actions/actions';
import { addToCart } from '../config/actions/actionsCart';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CgMenuMotion } from 'react-icons/cg';
import { ToastContainer, toast } from 'react-toastify';

const ProductList = () => {
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortByPrice, setSortByPrice] = useState('');
    const [sortByAlphabet, setSortByAlphabet] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        let results = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
            && (!selectedCategory || product.category === selectedCategory)
        );

        if (sortByPrice === 'lowToHigh') {
            results = results.sort((a, b) => a.price - b.price);
        } else if (sortByPrice === 'highToLow') {
            results = results.sort((a, b) => b.price - a.price);
        }

        if (sortByAlphabet === 'aToz') {
            results = results.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortByAlphabet === 'zToa') {
            results = results.sort((a, b) => b.title.localeCompare(a.title));
        }

        setSearchResults(results);
    }, [searchTerm, selectedCategory, sortByPrice, sortByAlphabet, products]);

    if (loading) {
        return <div>Loading...</div>;
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
        })
    };

    const categories = Array.from(new Set(products.map(product => product.category)));

    return (
        <>
            <div className="flex gap-3  p-8">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10 px-3 pr-10 placeholder-gray-400 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="sm:hidden border p-2 rounded-lg flex ml-auto transition-transform duration-00 transform hover:scale-105"
                >
                    <CgMenuMotion />
                </button>
            </div>
            {showFilter && (
                <div className="fixed inset-x-0 bottom-0 z-50 bg-gray-50 border-t border-gray-200 transition-transform duration-300 transform translate-y-0">
                    <div className="p-3 grid grid-cols-1 shadow-sm mx-auto">
                        <div className="Category grid grid-cols-2 gap-4">
                            <h3 className="font-semibold col-span-2">Filter by Category:</h3>
                            <button
                                className={`col-span-1 p-2 border rounded-lg ${selectedCategory === '' ? 'border-pink-500' : ''}`}
                                onClick={() => setSelectedCategory('')}
                            >
                                All
                            </button>
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`col-span-1 p-2 border rounded-lg ${selectedCategory === category ? 'border-pink-500' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4 justify-center items-center">
                            <div className="Price">
                                <h3 className="font-semibold mt-4">Sort by Price:</h3>
                                <select
                                    value={sortByPrice}
                                    onChange={(e) => setSortByPrice(e.target.value)}
                                    className="w-auto px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
                                >
                                    <option value="">None</option>
                                    <option value="lowToHigh">Low to High</option>
                                    <option value="highToLow">High to Low</option>
                                </select>
                            </div>
                            <div className="Name">
                                <h3 className="font-semibold mt-4">Sort by Name:</h3>
                                <select
                                    value={sortByAlphabet}
                                    onChange={(e) => setSortByAlphabet(e.target.value)}
                                    className="w-[150px] px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
                                >
                                    <option value="">None</option>
                                    <option value="aToz">A-Z</option>
                                    <option value="zToa">Z-A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Filter section */}
            <div className="grid grid-cols-4 gap-4 p-8 ">
                {/* Desktop filter */}
                <div className="hidden border p-8 h-[540px] rounded-lg sm:block col-span-1 mb-4 shadow-sm">
                    <div className="Category">
                        <h3 className="font-semibold ">Filter by Category:</h3>
                        <ul>
                            <li className={`mb-2 mt-2 ${selectedCategory === '' ? 'text-pink-500' : ''}`}>
                                <button onClick={() => setSelectedCategory('')}>All</button>
                            </li>
                            {categories.map(category => (
                                <li key={category} className={`mb-4 ${selectedCategory === category ? 'text-pink-500' : ''}`}>
                                    <button onClick={() => setSelectedCategory(category)}>{category}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="Price pt-1">
                        <h3 className="font-semibold mt-4">Sort by Price:</h3>
                        <select
                            value={sortByPrice}
                            onChange={(e) => setSortByPrice(e.target.value)}
                            className="w-48 px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
                        >
                            <option value="">None</option>
                            <option value="lowToHigh">Low to High</option>
                            <option value="highToLow">High to Low</option>
                        </select>
                    </div>
                    <div className="Name pt-3">
                        <h3 className="font-semibold mt-4">Sort by Name:</h3>
                        <select
                            value={sortByAlphabet}
                            onChange={(e) => setSortByAlphabet(e.target.value)}
                            className="w-48 px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
                        >
                            <option value="">None</option>
                            <option value="aToz">A-Z</option>
                            <option value="zToa">Z-A</option>
                        </select>
                    </div>
                </div>
                {/* Product list */}
                <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 ">
                    {/* Product list */}
                    {searchResults.map((product) => (
                        <div key={product.id} className="border p-4 relative shadow-sm rounded-lg w-full h-[320px]">
                            <button className="absolute top-0 right-0 mt-2 mr-2 p-2" onClick={() => toggleFavorite(product.id)}>
                                <FaHeart color={favorites.includes(product.id) ? 'pink' : 'gray'} size={20} />
                            </button>
                            <Link to={`/product/${product.id}`}>
                                <div className="">
                                    <img src={product.image} alt={product.title} className="mx-auto max-w-full h-24" />
                                    <p className='text-pink-500 font-semibold'>{product.category}</p>
                                    <h3>{product.title}</h3>
                                    <p className="">Price: ${product.price}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default ProductList;
