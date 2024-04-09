import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'; // Import ikon React
import { removeFromCart } from '../config/actions/actionsCart';

const CartComponent = ({ cartItems, deleteItem }) => {
    const [itemQuantity, setItemQuantity] = useState({});

    const increaseQuantity = (itemId) => {
        setItemQuantity({ ...itemQuantity, [itemId]: (itemQuantity[itemId] || 0) + 1 });
    };

    const handleDeleteItem = (productId) => {
        deleteItem(productId);
    };

    const decreaseQuantity = (itemId) => {
        if (itemQuantity[itemId] && itemQuantity[itemId] > 0) {
            setItemQuantity({ ...itemQuantity, [itemId]: itemQuantity[itemId] - 1 });
        }
    };

    const calculateTotalPrice = (itemId) => {
        const item = cartItems.find(item => item.id === itemId);
        return (itemQuantity[itemId] || 1) * item.price;
    };

    return (
        <div className="bg-gray-200 min-h-screen">
            <h1 className="text-2xl font-semibold ml-8 mt-5">Cart</h1>
            <div className="p-8 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full overflow-x-auto">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-600">Your cart is empty.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center justify-between">
                                    <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
                                        <img src={item.image} alt={item.title} className="w-[150px] h-[80px] object-contain" />
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <p className="text-lg font-semibold">{item.title}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    className="bg-blue-500 text-white font-bold py-2 px-2 border border-blue-500"
                                                >
                                                    <FaMinus />
                                                </button>
                                                <h1 className="px-3 border py-1">{itemQuantity[item.id] || 1}</h1>
                                                <button
                                                    onClick={() => increaseQuantity(item.id)}
                                                    className="bg-blue-500 text-white font-bold py-2 px-2 border border-blue-500"
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                            <p className="text-lg font-semibold ml-4">$ {calculateTotalPrice(item.id)}</p>
                                        </div>
                                        <div className="mt-4 flex justify-end md:text-right">
                                            <button onClick={() => handleDeleteItem(item.id)} className="text-red-500">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems,
    };
};
const mapDispatchToProps = {
    deleteItem: removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
