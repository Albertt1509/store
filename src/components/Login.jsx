/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import circleImage from '../img/icon.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://fakestoreapi.com/auth/login', {
                username,
                password,
            });
            const token = response.data.token;
            console.log('Login successful, token:', token);
            Cookies.set('token', token);
            setLoggedIn(true);
            toast.success('Login successful!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Login error:', error);
            if (error.response && error.response.status === 401) {
                toast.error('Invalid username or password!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error('Login failed. Please try again later.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    if (loggedIn) {
        return <Navigate to="/home" />;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col md:flex-row md:w-[750px] bg-pink-500 md:h-[550px] rounded-lg shadow-lg overflow-hidden">
                <div className="md:w-1/2 bg-white flex justify-center items-start md:items-center">
                    <div className="w-full max-w-sm p-8">
                        <h2 className="text-2xl font-bold mb-8 text-center md:text-left">Login</h2>
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="username" className="block text-gray-700 font-bold">Username</label>
                                <input type="text" id="username" placeholder='username :mor_2314' name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border-b-2 border-gray-300 rounded-none px-4 py-2 w-full focus:outline-none focus:border-pink-500" />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="block text-gray-700 font-bold">Password</label>
                                <input type={showPassword ? "text" : "password"} id="password" placeholder='Passoword :83r5^_' name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-b-2 border-gray-300 rounded-none px-4 py-2 w-full mb-4 focus:outline-none focus:border-pink-500" />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    {showPassword ? (
                                        <FaEyeSlash className="text-gray-500 cursor-pointer" onClick={toggleShowPassword} />
                                    ) : (
                                        <FaEye className="text-gray-500 cursor-pointer" onClick={toggleShowPassword} />
                                    )}
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none w-full"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
                <div className="hidden md:block md:w-1/2 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white h-40 w-40 rounded-full">
                        <img src={circleImage} alt="Circle Image" className="p-4 h-full w-full object-cover rounded-full" />
                        <h1 className="flex  text-white text-xl font-bold mt-2 text-center">Welcome to Fake Store</h1>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
