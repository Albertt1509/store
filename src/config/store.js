import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import productReducer from './reducers/reducers';
import cartReducer from './reducers/reducersCart';
import authReducer from './reducers/reducersLogin';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
