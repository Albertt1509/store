import axios from 'axios';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const fetchCartSuccess = (cartItems) => ({
    type: FETCH_CART_SUCCESS,
    payload: cartItems,
});

export const fetchCartFailure = (error) => ({
    type: FETCH_CART_FAILURE,
    payload: error,
});

export const fetchCart = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post('https://fakestoreapi.com/carts');
            const data = await response.json();
            dispatch(fetchCartSuccess(data));
        } catch (error) {
            dispatch(fetchCartFailure(error.message));
        }
    };
};
