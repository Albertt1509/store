
import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const CHECK_AUTH = 'CHECK_AUTH';
export const LOGOUT = 'LOGOUT';
export const login = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post('https://fakestoreapi.com/auth/login', {
            username,
            password,
        });
        const { token } = response.data;

        document.cookie = `token=${token}`;

        dispatch({ type: LOGIN_SUCCESS, payload: token });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

export const checkAuth = () => async (dispatch) => {
    const token = getCookie('token');

    if (token) {
        dispatch({ type: LOGIN_SUCCESS, payload: token });
    } else {
        dispatch({ type: LOGIN_FAILURE, payload: 'Token not found' });
    }
};
export const logout = () => async (dispatch) => {
    document.cookie = 'token=; expires=; path=/;';
    dispatch({ type: LOGOUT });
};
const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
};
