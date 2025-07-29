import React, { useState } from 'react';
import ProductList from '../components/Image/ImageData';
import FilterData from '../components/Filter/FilterData';
import { FaSearch } from 'react-icons/fa';

const Home = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [filterAuthor, setFilterAuthor] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    return (
        <div className="bg-gray-50 min-h-screen p-6 relative">
            <ProductList filterAuthor={filterAuthor} />
            <button
                onClick={() => setShowFilter((prev) => !prev)}
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
                <FaSearch />
            </button>
        <button
            onClick={() => setShowFilter(true)}
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        >
            🔍
        </button>
            <FilterData
                visible={showFilter}
                filterAuthor={filterAuthor}
                setFilterAuthor={setFilterAuthor}
                selectedCategories={selectedCategories} 
                setSelectedCategories={setSelectedCategories}
                onClose={() => setShowFilter(false)}
            />
        </div>
    );
};

export default Home;

