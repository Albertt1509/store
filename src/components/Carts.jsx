import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    increaseQuantity,
    decreaseQuantity,
    toggleCheckbox,
    removeFromCart,
    getTotalCheckedItems,
    getTotalPriceCheckedItems,
} from '../config/actions/actionsCart';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartComponent = ({
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    toggleCheckbox,
    totalCheckedItems,
    totalCheckedPrice,
    getTotalCheckedItems,
    getTotalPriceCheckedItems,
}) => {
    useEffect(() => {
        getTotalCheckedItems();
        getTotalPriceCheckedItems();
    }, [cartItems, getTotalCheckedItems, getTotalPriceCheckedItems]);

    const handleIncreaseQuantity = (itemId) => {
        increaseQuantity(itemId);
    };

    const handleDeleteItem = (productId) => {
        removeFromCart(productId);
    };
    const handleDecreaseQuantity = (itemId) => {
        decreaseQuantity(itemId);
    };

    const handleToggleCheckbox = (itemId) => {
        toggleCheckbox(itemId);
        getTotalCheckedItems();
        getTotalPriceCheckedItems();
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold ml-8 mt-5">Cart</h1>
            <div className="p-8 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full overflow-x-auto">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-600">Your cart is empty.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center justify-between relative">
                                    <input
                                        type="checkbox"
                                        checked={item.checked || false}
                                        onChange={() => handleToggleCheckbox(item.id)}
                                        className="absolute top-2 left-2 md:left-auto  mt-2"
                                    />
                                    <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
                                        <img src={item.image} alt={item.title} className="w-[150px] h-[80px] object-contain" />
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <p className="text-lg font-semibold">{item.title}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => handleDecreaseQuantity(item.id)}
                                                    className="bg-blue-500 text-white font-bold py-2 px-2 border border-blue-500"
                                                >
                                                    <FaMinus />
                                                </button>
                                                <h1 className="px-3 border py-1">{item.quantity || 1}</h1>
                                                <button
                                                    onClick={() => handleIncreaseQuantity(item.id)}
                                                    className="bg-blue-500 text-white font-bold py-2 px-2 border border-blue-500"
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                            <p className="text-lg font-semibold ml-4">$ {item.price || 0}</p>
                                        </div>
                                        <div className="mt-4 flex justify-end md:text-right">
                                            <div className="mt-4 flex justify-end md:text-right">
                                                <button onClick={() => handleDeleteItem(item.id)} className="text-red-500">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className=" mr-auto">
                        <div className="">
                            <p>Total Checked Items: {totalCheckedItems}</p>
                            <p>Total Price: $ {totalCheckedPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems,
    totalCheckedItems: state.cart.totalCheckedItems,
    totalCheckedPrice: state.cart.totalCheckedPrice,
});

const mapDispatchToProps = {
    increaseQuantity,
    removeFromCart,
    decreaseQuantity,
    toggleCheckbox,
    getTotalCheckedItems,
    getTotalPriceCheckedItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
