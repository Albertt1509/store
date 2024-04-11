import React, { useState } from 'react';
import { SlBasket, SlUser } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../config/actions/actionLogin';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="bg-pink-500 p-4">
            <div className="max-w-7xl mx-auto flex justify-center items-center">
                <div className="text-white text-xl font-bold mr-auto">
                    <Link to={'/home'}>🌸Sakura Blossom</Link>
                </div>
                <div className="flex gap-5">
                    <ul className="flex space-x-4">
                        <button className="p-2 bg-white rounded-full flex items-center relative">
                            <Link to={'/carts'}>
                                <SlBasket />
                            </Link>
                        </button>
                    </ul>
                    <ul className="flex space-x-4 relative">
                        <button
                            className="p-2 bg-white rounded-full flex items-center"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <SlUser />
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute right-0 top-full mt-2 bg-white rounded-md shadow-md">
                                <li className="px-4 py-2 hover:bg-gray-200">
                                    <Link to={'/'} onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
