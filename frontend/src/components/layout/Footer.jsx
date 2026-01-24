import React from 'react';
import { Link } from 'react-router-dom';
// Maine yahan 'FaLock' add kar diya hai imports mein
import { FaGithub, FaLinkedin, FaInstagram, FaHeart, FaArrowUp, FaEnvelope, FaMapMarkerAlt, FaLock } from 'react-icons/fa';

const Footer = () => {

    // --- SCROLL TO TOP FUNCTION ---
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-gray-950 relative pt-16 pb-8 border-t border-gray-800">

            <div className="max-w-6xl mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* --- COLUMN 1: BRAND INFO --- */}
                    <div data-aos="fade-up">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ganesh <span className="text-blue-500">Dutt.</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Full Stack Web Developer & Trainer. Passionate about building scalable
                            applications and mentoring the next generation of developers.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons */}
                            <a href="https://github.com/ganeshdutt100" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1">
                                <FaGithub />
                            </a>
                            <a href="www.linkedin.com/in/ganesh-dutt-514a94243" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#0077b5] hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <FaLinkedin />
                            </a>
                            <a href="https://www.instagram.com/webgyaan.hub/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* --- COLUMN 2: QUICK LINKS --- */}
                    <div data-aos="fade-up" data-aos-delay="100">
                        <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" onClick={scrollToTop} className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-blue-500 transition-all duration-300"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects" onClick={scrollToTop} className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-blue-500 transition-all duration-300"></span>
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" onClick={scrollToTop} className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-blue-500 transition-all duration-300"></span>
                                    About Me
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" onClick={scrollToTop} className="text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-blue-500 transition-all duration-300"></span>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* --- COLUMN 3: CONTACT INFO --- */}
                    <div data-aos="fade-up" data-aos-delay="200">
                        <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 text-blue-500 text-xl"><FaMapMarkerAlt /></div>
                                <div>
                                    <h4 className="text-white font-semibold">Location</h4>
                                    <p className="text-gray-400 text-sm">New Delhi, India</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 text-blue-500 text-xl"><FaEnvelope /></div>
                                <div>
                                    <h4 className="text-white font-semibold">Email</h4>
                                    <a href="mailto:webgyaan.hub@gmail.com" className="text-gray-400 text-sm hover:text-blue-400 transition-colors">
                                        webgyaan.hub@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* --- UPDATED COPYRIGHT SECTION WITH SECRET LOCK --- */}
                    <div className="text-gray-500 text-sm text-center md:text-left flex items-center gap-3 justify-center md:justify-start">
                        <span>© {new Date().getFullYear()} Ganesh Dutt. All rights reserved.</span>

                        {/* 🔒 SECRET ADMIN BUTTON */}
                        <Link
                            to="/admin"
                            className="opacity-10 hover:opacity-100 transition-opacity duration-300 text-gray-400 hover:text-blue-500"
                            title="Admin Access"
                        >
                            <FaLock size={12} />
                        </Link>
                    </div>

                    <p className="text-gray-500 text-sm flex items-center gap-1">
                        Made with <FaHeart className="text-red-500 animate-pulse" /> using MERN Stack
                    </p>

                    {/* Back to Top Button */}
                    <button
                        onClick={scrollToTop}
                        className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 hover:-translate-y-1 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    >
                        <FaArrowUp />
                    </button>
                </div>

            </div>
        </footer>
    );
};

export default Footer;