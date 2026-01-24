import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Active link highlight karne ke liye

    // Function to determine active class
    const isActive = (path) => {
        return location.pathname === path
            ? "text-blue-400 font-semibold"
            : "text-gray-300 hover:text-white";
    };

    return (
        <>
            {/* --- MAIN NAVBAR (Fixed Top) --- */}
            <nav className="fixed top-0 w-full z-50 bg-gray-900/60 backdrop-blur-md border-b border-gray-800 transition-all duration-300" data-aos="fade-right"
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    {/* 1. LOGO */}
                    <Link to="/" className="text-2xl font-bold tracking-tighter" data-aos="fade-left"
                        data-aos-delay="200" onClick={() => setIsOpen(false)}>
                        GANESH <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">DUTT.</span>
                    </Link>

                    {/* 2. DESKTOP MENU (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center space-x-8" data-aos="fade-right"
                        data-aos-delay="400">

                        {/* --- NAV LINKS WITH SLIDING UNDERLINE EFFECT --- */}
                        {['/', '/about', '/projects', '/contact'].map((path, index) => {
                            const labels = ['Home', 'About', 'Projects', 'Contact'];
                            const active = location.pathname === path; // isActive check

                            return (
                                <Link key={index} to={path} className="relative group">
                                    {/* Link Text */}
                                    <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${active ? 'text-blue-400' : 'text-gray-300 group-hover:text-white'
                                        }`}>
                                        {labels[index]}
                                    </span>

                                    {/* Animated Line (Magic Happens Here) */}
                                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-blue-500 transition-all duration-300 ease-out ${active ? 'w-full shadow-[0_0_10px_#3b82f6]' : 'w-0 group-hover:w-full'
                                        }`}></span>
                                </Link>
                            );
                        })}

                        {/* --- CTA BUTTON WITH NEON GLOW --- */}
                        <Link to="/resume">
                            <button className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-bold tracking-wide shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] active:scale-95 border border-blue-500/30">

                                {/* Shiny Shine Effect overlay */}
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>

                                Hire Me
                            </button>
                        </Link>

                    </div>

                    {/* 3. MOBILE HAMBURGER ICON (Visible only on Mobile) */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden text-white text-2xl focus:outline-none"
                    >
                        <FaBars />
                    </button>
                </div>
            </nav>

            {/* --- MOBILE SIDE DRAWER (Right Side Slide-in) --- */}

            {/* Overlay (Background Dark hone ke liye) */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Sidebar Content (Glassmorphism) */}
            <div
                className={`fixed top-0 right-0 h-full w-[280px] bg-gray-900/80 backdrop-blur-xl border-l border-gray-700 z-[70] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-6 flex flex-col h-full">

                    {/* Header: Close Button */}
                    <div className="flex justify-between items-center mb-10">
                        <span className="text-xl font-bold text-white">Menu</span>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
                            <FaTimes size={24} />
                        </button>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col space-y-6 text-lg">
                        <Link to="/" onClick={() => setIsOpen(false)} className={`${isActive('/')} hover:translate-x-2 transition-transform duration-300`}>
                            Home
                        </Link>
                        <Link to="/projects" onClick={() => setIsOpen(false)} className={`${isActive('/projects')} hover:translate-x-2 transition-transform duration-300`}>
                            My Projects
                        </Link>
                        <Link to="/contact" onClick={() => setIsOpen(false)} className={`${isActive('/contact')} hover:translate-x-2 transition-transform duration-300`}>
                            Contact Me
                        </Link>
                    </div>

                    {/* Footer Area in Menu */}
                    <div className="mt-auto">
                        <div className="w-full h-[1px] bg-gray-700 mb-6"></div>
                        <p className="text-gray-500 text-sm mb-4">Connect with me</p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-gray-800 rounded-full text-white hover:bg-blue-600 transition"><FaLinkedin /></a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition"><FaGithub /></a>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Navbar;