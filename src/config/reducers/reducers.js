import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FILTER_BY_CATEGORY,
    SORT_BY_ALPHABET,
    SORT_BY_PRICE,
    SEARCH_PRODUCTS
} from '../actions/actions';

const initialState = {
    loading: false,
    products: [],
    filteredProducts: [],
    sortByAlphabet: null,
    sortPriceOrder: null,
    error: '',
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: '',
            };

        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                products: [],
                error: action.payload,
            };

        case FILTER_BY_CATEGORY:
            const filteredByCategory = state.products.filter(product => product.category === action.payload);
            return { ...state, filteredProducts: filteredByCategory };

        case SORT_BY_ALPHABET:
            let sortedProductsAZ = [...state.products].sort((a, b) => a.title.localeCompare(b.title));
            let sortedProductsZA = [...state.products].sort((a, b) => b.title.localeCompare(a.title));
            return {
                ...state,
                products: action.payload === 'az' ? sortedProductsAZ : sortedProductsZA,
                sortByAlphabet: action.payload,
            };

        case SORT_BY_PRICE:
            const sortedPriceProducts = [...state.products].sort((a, b) => {
                if (action.payload === 'asc') {
                    return a.price - b.price;
                } else if (action.payload === 'desc') {
                    return b.price - a.price;
                }
                return 0;
            });
            return {
                ...state,
                products: sortedPriceProducts,
                sortPriceOrder: action.payload,
            };

        case SEARCH_PRODUCTS:
            const searchTerm = action.payload.toLowerCase();
            const filteredBySearch = state.products.filter(product =>
                product.title.toLowerCase().includes(searchTerm)
            );
            return {
                ...state,
                filteredProducts: filteredBySearch,
            };

        default:
            return state;
    }
};

export default productReducer;
