import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import Pay from '../img/lottie/aris.gif'
const CheckoutModal = ({ cartItems, setShowModal }) => {
    const [showPayImage, setShowPayImage] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handlePay = () => {
        setShowPayImage(true);
        // Lakukan tindakan pembayaran atau pemrosesan pembayaran lainnya di sini
    };
    const filteredCartItems = cartItems.filter(item => item.quantity > 0);

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        filteredCartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        return totalPrice;
    };

    return (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center backdrop-blur-md">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Checkout Details</h2>
                    <button onClick={handleCloseModal} className="text-gray-600">
                        <FaTimes />
                    </button>
                </div>
                {filteredCartItems.map(item => (
                    <div key={item.id} className="mb-4">
                        <p className="text-lg font-semibold">{item.title}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: $ {item.price * item.quantity}</p>
                    </div>
                ))}
                <div className="mt-4">
                    <p className="text-lg font-semibold">Total Price: $ {calculateTotalPrice()}</p>
                </div>
                <div className="mt-4 flex justify-between">
                    <button onClick={handlePay} className="bg-pink-500 text-white px-4 py-2 rounded-md">
                        Pay
                    </button>
                    <button onClick={handleCloseModal} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Close
                    </button>
                </div>
                {showPayImage && (
                    <div className="mt-4">
                        <h1 className='text-center'>COMMING SOON</h1>
                        <img src={Pay} alt="Pay" className="w-full" />
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps)(CheckoutModal);
