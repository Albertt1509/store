import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAILURE,
} from '../actions/actionsCart';

const initialState = {
    product: [],
    cartItems: JSON.parse(localStorage.getItem('cart')) || [], // Mendapatkan data keranjang dari local storage saat inisialisasi
    error: null,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const newCartItems = [...state.cartItems, action.payload];
            localStorage.setItem('cart', JSON.stringify(newCartItems)); // Menyimpan data keranjang baru ke local storage
            return {
                ...state,
                cartItems: newCartItems,
            };

        case REMOVE_FROM_CART:
            const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(updatedCartItems)); // Menyimpan data keranjang yang diperbarui ke local storage
            return {
                ...state,
                cartItems: updatedCartItems,
            };

        case FETCH_CART_SUCCESS:
            return {
                ...state,
                cartItems: action.payload,
                error: null,
            };

        case FETCH_CART_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default cartReducer;
