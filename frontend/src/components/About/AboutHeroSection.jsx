import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaArrowRight, FaLinkedin, FaGithub, FaTwitter, FaHockeyPuck } from 'react-icons/fa';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';

const AboutHeroSection = () => {
    return (
        <div className="relative w-full overflow-hidden">



            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

                {/* --- 3 COLUMN GRID LAYOUT (Updated Ratios for bigger center image) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    {/* --- COLUMN 1: INTRO (LEFT - SMALLER) --- */}
                    {/* lg:col-span-4 se change karke lg:col-span-3 kiya */}
                    <div className="lg:col-span-3 text-center lg:text-left order-2 lg:order-1" data-aos="fade-right">

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            Who I Am
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                            I'm <br />
                            <span className="text-white">Ganesh Dutt</span>
                        </h1>

                        <h2 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
                            Developer & <br /> Mentor.
                        </h2>

                        {/* Social Icons */}
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 mt-8">
                            <a href="#" className="p-3 bg-gray-900 rounded-full hover:text-blue-500 hover:bg-gray-800 transition-all border border-gray-800"><FaLinkedin size={18} /></a>
                            <a href="#" className="p-3 bg-gray-900 rounded-full hover:text-white hover:bg-gray-800 transition-all border border-gray-800"><FaGithub size={18} /></a>
                            <a href="#" className="p-3 bg-gray-900 rounded-full hover:text-blue-400 hover:bg-gray-800 transition-all border border-gray-800"><FaTwitter size={18} /></a>
                        </div>
                    </div>

                    {/* --- COLUMN 2: IMAGE (CENTER - BIGGER FULL SIZE) --- */}
                    {/* lg:col-span-4 se change karke lg:col-span-6 kiya aur max-w-sm hataya */}
                    {/* --- COLUMN 2: IMAGE (CENTER - PREMIUM 3D LOOK) --- */}
                    <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center px-4 lg:px-0 relative" data-aos="zoom-in">

                        {/* 1. Back Glow (Soft & Static) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/20 rounded-full blur-[100px] -z-10"></div>

                        <div className="relative w-full max-w-md mx-auto group">

                            {/* 2. Floating Tech Icons (Decoration) */}
                            {/* Top Right - React */}
                            <div className="absolute -top-6 -right-6 z-20 bg-gray-900 p-4 rounded-2xl border border-gray-700 shadow-xl animate-bounce duration-[3000ms]">
                                <FaReact className="text-4xl text-blue-400 animate-spin-slow" />
                            </div>

                            {/* Bottom Left - Node */}
                            <div className="absolute -bottom-6 -left-6 z-20 bg-gray-900 p-4 rounded-2xl border border-gray-700 shadow-xl animate-bounce duration-[3000ms] delay-700">
                                <FaNodeJs className="text-4xl text-green-500" />
                            </div>

                            {/* 3. Main Image Container (Glass Effect) */}
                            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-gray-900/50 backdrop-blur-sm">

                                {/* Image */}
                                <img
                                    src="/images/pic4.jpeg"
                                    alt="Ganesh Dutt"
                                    className="w-full h-auto md:h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Subtle Gradient Overlay (Bottom only) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90"></div>

                                {/* 4. Glass Badge (Premium Look) */}
                                {/* 4. Glass Badge (Compact Size) */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max">
                                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 py-2 px-4 rounded-full flex items-center gap-4 shadow-lg">

                                        <div className="flex items-center gap-3">
                                            {/* Dot Animation */}
                                            <div className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                            </div>

                                            {/* Text (Compact) */}
                                            <div>
                                                <p className="text-gray-400 text-[9px] uppercase tracking-wider font-bold leading-none">Status</p>
                                                <p className="text-white text-xs font-bold leading-tight">Open to Work</p>
                                            </div>
                                        </div>

                                        {/* Separator Line */}
                                        <div className="w-[1px] h-6 bg-white/10"></div>

                                        {/* Database Icon (Smaller) */}
                                        <div className="text-blue-400 text-sm">
                                            <FaDatabase />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- COLUMN 3: DETAILS (RIGHT - SMALLER) --- */}
                    {/* lg:col-span-4 se change karke lg:col-span-3 kiya */}
                    <div className="lg:col-span-3 text-center lg:text-left order-3" data-aos="fade-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6">
                            👋
                            Hey
                        </div>
                        <p className="text-gray-300 text-base leading-relaxed mb-6">
                            I am a <span className="text-white font-semibold border-b-2 border-blue-500">Full Stack MERN Developer</span> based in New Delhi.
                        </p>

                        <p className="text-gray-400 text-sm leading-relaxed mb-8 italic">
                            "I don't just write code; I write logic that solves real-world problems."
                        </p>

                        {/* Stats Row */}
                        <div className="flex justify-center lg:justify-between items-center border-y border-gray-800 py-6 mb-8 gap-4">
                            <div className="text-center">
                                <span className="block text-xl font-bold text-white">2+</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Years</span>
                            </div>
                            <div className="w-[1px] h-8 bg-gray-800"></div>
                            <div className="text-center">
                                <span className="block text-xl font-bold text-white">20+</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Projects</span>
                            </div>
                            <div className="w-[1px] h-8 bg-gray-800"></div>
                            <div className="text-center">
                                <span className="block text-xl font-bold text-white">500+</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Students</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className=" flex  gap-4 justify-center ">
                            <Link
                                to="/resume"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1 text-sm"
                            >
                                <FaEye /> Resume
                            </Link>

                            <Link
                                to="/contact"
                                className="flex items-center justify-center gap-2 px-8 py-3 border border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-500 rounded-xl font-bold transition-all text-sm"
                            >
                                Let's Connect <FaArrowRight className="text-xs" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutHeroSection;