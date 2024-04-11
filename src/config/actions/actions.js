import axios from 'axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
export const SORT_BY_ALPHABET = 'SORT_BY_ALPHABET';
export const SORT_BY_PRICE = 'SORT_BY_PRICE';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';

export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
});

export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
});

export const filterByCategory = (category) => ({
    type: FILTER_BY_CATEGORY,
    payload: category,
});

export const sortByAlphabet = (order) => ({
    type: SORT_BY_ALPHABET,
    payload: order,
});

export const sortByPrice = (order) => ({
    type: SORT_BY_PRICE,
    payload: order,
});

export const searchProducts = (searchTerm) => ({
    type: SEARCH_PRODUCTS,
    payload: searchTerm,
});

export const fetchProducts = () => {
    return (dispatch) => {
        dispatch(fetchProductsRequest());
        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                const products = response.data;
                dispatch(fetchProductsSuccess(products));
            })
            .catch((error) => {
                dispatch(fetchProductsFailure(error.message));
            });
    };
};
