import axios from 'axios';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';
export const TOTAL_PRICE_TOGGLE_CHECKBOX = 'TOTAL_PRICE_TOGGLE_CHECKBOX';
export const GET_TOTAL_CHECKED_ITEMS = 'GET_TOTAL_CHECKED_ITEMS';

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

export const increaseQuantity = (itemId) => ({
    type: INCREASE_QUANTITY,
    payload: itemId,
});

export const decreaseQuantity = (itemId) => ({
    type: DECREASE_QUANTITY,
    payload: itemId,
});

export const toggleCheckbox = (itemId) => ({
    type: TOGGLE_CHECKBOX,
    payload: itemId,
});


export const getTotalCheckedItems = () => ({
    type: GET_TOTAL_CHECKED_ITEMS,
});
export const getTotalPriceCheckedItems = () => ({
    type: TOTAL_PRICE_TOGGLE_CHECKBOX,
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
