import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Mengimpor thunk dari 'redux-thunk'
import productReducer from './reducers/reducers';
import cartReducer from './reducers/reducersCart';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // Menggunakan thunk tanpa destrukturisasi
export default store;
