import React from 'react';
import { SlBasket } from 'react-icons/sl'
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav className=" bg-pink-500 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">Sakura Blossom</div>
                <ul className="flex space-x-4">
                    <button className='p-2 bg-white rounded-full flex items-center'>
                        <Link to={'/carts'}>
                            <SlBasket />
                        </Link>
                    </button>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
