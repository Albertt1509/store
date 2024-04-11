import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    TOGGLE_CHECKBOX,
    GET_TOTAL_CHECKED_ITEMS,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAILURE,
    TOTAL_PRICE_TOGGLE_CHECKBOX

} from '../actions/actionsCart';

const initialState = {
    product: [],
    selectedItem: {},
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    totalCheckedPrice: 0,
    totalCheckedItems: 0,
    error: null,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const newCartItems = [...state.cartItems, action.payload];
            localStorage.setItem('cart', JSON.stringify(newCartItems));
            return {
                ...state,
                cartItems: newCartItems,
            };

        case REMOVE_FROM_CART:
            const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(updatedCartItems));
            return {
                ...state,
                cartItems: updatedCartItems,
            };

        case INCREASE_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload ? {
                        ...item,
                        quantity: (item.quantity || 0) + 1,
                        price: formatPrice(item.price * ((item.quantity || 0) + 1) / (item.quantity || 1))
                    } : item
                ),
            };

        case DECREASE_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload ? {
                        ...item,
                        quantity: Math.max((item.quantity || 1) - 1, 1),
                        price: formatPrice(item.price * (Math.max((item.quantity || 1) - 1, 1) / (item.quantity || 1)))
                    } : item
                ),
            };

        case TOGGLE_CHECKBOX:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload ? { ...item, checked: !item.checked } : item
                ),
            };

        case GET_TOTAL_CHECKED_ITEMS:
            const totalCheckedItems = state.cartItems.reduce((total, item) =>
                item.checked ? total + 1 : total, 0);
            return {
                ...state,
                totalCheckedItems,
            };
        case TOTAL_PRICE_TOGGLE_CHECKBOX:
            let totalCheckedPrice = 0;
            state.cartItems.forEach(item => {
                if (item.checked) {
                    totalCheckedPrice += item.price * item.quantity;
                }
            });
            return {
                ...state,
                totalCheckedPrice: totalCheckedPrice.toFixed(2),
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
const formatPrice = (price) => {
    if (price % 1 === 0) {
        return price.toFixed(0);
    } else {
        return price.toFixed(2);
    }
};

export default cartReducer;
