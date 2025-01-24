import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <div className="text-3xl font-bold text-white tracking-wide hover:text-green-200 transition-transform transform hover:scale-110">
                    <Link to="/">PLANT<span className="text-yellow-300">-EASE</span>
                    </Link>
                </div>

                {/* Hamburger Icon (Mobile) */}
                <button
                    className="text-white md:hidden focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isOpen ? (
                        <XMarkIcon className="h-8 w-8 hover:text-yellow-300 transition-transform transform hover:rotate-90 duration-300" />
                    ) : (
                        <Bars3Icon className="h-8 w-8 hover:text-yellow-300 transition-transform transform hover:scale-110 duration-300" />
                    )}
                </button>

                {/* Navigation Links */}
                <ul
                    className={`md:flex space-y-6 md:space-y-0 md:space-x-6 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-gradient-to-r from-green-400 via-green-500 to-green-600 md:bg-transparent p-6 md:p-0 transform ${
                        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    } transition-transform duration-300 ease-in-out shadow-md md:shadow-none`}
                >
                    {[
                        { name: "Home", link: "/home" },
                        { name: "Scan Leaf", link: "/scan" },
                        { name: "History", link: "/history" },
                        { name: "Terms of Service", link: "/terms" },
                        { name: "About Us", link: "/about" },
                    ].map((item, index) => (
                        <li key={index} className="text-lg font-semibold text-white hover:text-yellow-300 hover:underline transition-transform transform hover:scale-110">
                            <Link to={item.link} onClick={() => setIsOpen(false)}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link to="/account" onClick={() => setIsOpen(false)}>
                            <UserCircleIcon className="h-10 w-10 text-white hover:text-yellow-300 transition-transform transform hover:scale-125" />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
