import React from 'react';

const categories = ['Price', 'Color', 'Brand'];

export default function FilterData({ filterAuthor, setFilterAuthor, visible, onClose, selectedCategories, setSelectedCategories }) {
    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <div
            className={`
                fixed bottom-0 right-0 left-0 z-50 mx-auto w-full max-w-full
                transition-transform duration-300 ease-in-out
                bg-white rounded-t-xl shadow-lg
                ${visible ? 'translate-y-0' : 'translate-y-full'}
            `}
        >
            <div className="p-4 h-full flex flex-col overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Filter</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 text-xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Author
                    </label>
                    <input
                        type="text"
                        value={filterAuthor}
                        onChange={(e) => setFilterAuthor(e.target.value)}
                        placeholder="Filter by author"
                        className="w-full border rounded p-2 text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => toggleCategory(category)}
                                className={`
                                    px-3 py-1 rounded-full border text-sm
                                    ${selectedCategories.includes(category)
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300'}
                                `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
