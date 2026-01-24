import React from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { FaEnvelope, FaGithub, FaLinkedin, FaPaintBrush, FaCode, FaMobileAlt, FaServer, FaInstagram } from 'react-icons/fa';

const HeroSection = () => {


    return (
        <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden flex items-center justify-center pt-30   pb-10 px-10">

            {/* --- BACKGROUND GLOW EFFECTS (Soft Lighting) --- */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* --- LEFT SIDE: TEXT & INFO --- */}
                <div className="space-y-8 z-10 order-2 lg:order-1 text-center lg:text-left" data-aos="fade-right"
                    data-aos-delay="400">

                    {/* Intro */}
                    <div>

                        <h2 className="text-2xl text-blue-400 font-medium tracking-wide mb-2" data-aos="fade-right"
                            data-aos-delay="200">Hello, I'm</h2>
                        {/* NAME */}
                        <h1 className="text-7xl md:text-8xl font-black text-white mb-4 leading-none tracking-wide" data-aos="flip-up"
                            data-aos-delay="200">
                            GANESH <span className="text-gray-600 ">DUTT</span>
                        </h1>

                        {/* --- TYPEWRITER EFFECT HERE --- */}
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 h-[50px]">
                            I'm a{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                                {/* Ye Line Type Karegi */}
                                <Typewriter
                                    words={['Full Stack Developer', 'Creative Designer', 'Problem Solver', 'Content Creator']}
                                    loop={0} // Infinite Loop
                                    cursor
                                    cursorStyle='|'
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Full Stack MERN Developer & Trainer with a passion for building beautiful, functional, and scalable web applications. I turn complex logic into smooth digital experiences.
                        </p>
                    </div>

                    {/* Email Pill & Socials */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">

                        {/* Email Badge */}
                        <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 py-3 px-6 rounded-full flex items-center gap-3 shadow-lg hover:border-blue-500 transition cursor-pointer">
                            <div className="bg-blue-600 p-2 rounded-full text-white text-xs">
                                <FaEnvelope />
                            </div>
                            <span className="text-sm font-medium text-gray-300"><a href="mailto:webgyaan.hub@gmail.com">webgyaan.hub@gmail.com</a></span>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4" data-aos="fade-left"
                            data-aos-delay="200">
                            <a href="https://github.com/ganeshdutt100" className="p-3 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition border border-gray-700 hover:border-gray-500"><FaGithub size={20} /></a>
                            <a href="https://www.linkedin.com/in/ganesh-dutt-514a94243/" className="p-3 bg-gray-800 rounded-full text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition border border-gray-700 hover:border-gray-500"><FaLinkedin size={20} /></a>
                            <a href="https://www.instagram.com/webgyaan.hub/" className="p-3 bg-gray-800 rounded-full text-gray-400 hover:text-pink-600 hover:bg-gray-700 transition border border-gray-700 hover:border-gray-500"><FaInstagram size={20} /></a>
                            <a href="tel:+917078404837" className="p-3 bg-gray-800 rounded-full text-gray-400 hover:text-green-600 hover:bg-gray-700 transition border border-gray-700 hover:border-gray-500"><FaMobileAlt size={20} /></a>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4" data-aos="fade-left"
                        data-aos-delay="200">
                        <Link to="/contact">
                            <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-105 transition transform">
                                LET'S TALK
                            </button>
                        </Link>
                    </div>
                </div>

                {/* --- RIGHT SIDE: IMAGE & FLOATING CARDS --- */}
                <div className="relative flex justify-center items-center order-1 lg:order-2" data-aos="zoom-in"
                    data-aos-delay="200">

                    {/* Main Circle Behind Image */}
                    <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-gray-800/50 rounded-full border border-gray-700/50"></div>
                    <div className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-gray-800 rounded-full opacity-50 animate-pulse"></div>

                    {/* YOUR PHOTO HERE */}

                    <img
                        src="/images/g1_bgremove.png"
                        alt="Ganesh Dutt"
                        className="relative z-10 w-[300px] md:w-[400px] object-cover drop-shadow-2xl hover:scale-105 transition duration-500 rounded-b-full md:mt-[-120px]"
                        style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 93%)' }} // Bottom fade effect
                    />

                    {/* --- FLOATING CARD 1 (Top Right - UI/UX) --- */}
                    <div className="absolute top-0 right-0 md:top-10 md:right-10 lg:top-25 lg:right-0 xl:top-10 xl:right-10 bg-gray-800/60 backdrop-blur-xl border border-gray-600 sm:p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce hover:scale-110 transition cursor-pointer z-20 max-w-[180px]" data-aos="fade-left"
                        data-aos-delay="200">
                        <div className="bg-purple-500/20 p-3 rounded-lg text-purple-400">
                            <FaServer size={20} />
                        </div>
                        <div data-aos="fade-left"
                            data-aos-delay="200">
                            <h3 className="text-white font-bold text-sm">Robust Backend</h3>
                            <p className="text-gray-400 text-xs">Node.js & Express APIs</p>
                        </div>
                    </div>

                    {/* --- FLOATING CARD 2 (Bottom Right - React Dev) --- */}
                    <div className="absolute bottom-10 right-[-10px] md:bottom-20 md:right-[-20px] bg-gray-800/60 backdrop-blur-xl border border-gray-600 p-4 rounded-2xl shadow-2xl flex items-center gap-4 hover:scale-110 transition cursor-pointer z-20 max-w-[200px]" data-aos="fade-left"
                        data-aos-delay="300">
                        <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">
                            <FaCode size={20} />
                        </div>
                        <div >
                            <h3 className="text-white font-bold text-sm">React Developer</h3>
                            <p className="text-gray-400 text-xs">MERN Stack Expert</p>
                        </div>
                    </div>

                    {/* --- FLOATING CARD 3 (Left - Mobile/Tech) --- */}
                    <div className="absolute top-1/2 left-[-20px] md:left-0 bg-gray-800/60 backdrop-blur-xl border border-gray-600 p-4 rounded-2xl shadow-2xl flex items-center gap-4 hover:scale-110 transition cursor-pointer z-20 max-w-[180px]" data-aos="fade-left"
                        data-aos-delay="400">
                        <div className="bg-green-500/20 p-3 rounded-lg text-green-400">
                            <FaMobileAlt size={20} />
                        </div>
                        <div >
                            <h3 className="text-white font-bold text-sm">Responsive</h3>
                            <p className="text-gray-400 text-xs">Mobile First</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeroSection;