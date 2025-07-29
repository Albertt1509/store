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
                    <Link to={'/home'}>🌸Alconel</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
