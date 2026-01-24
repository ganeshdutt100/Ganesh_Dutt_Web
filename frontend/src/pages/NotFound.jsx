import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden">

            {/* --- BACKGROUND GLOWS --- */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse"></div>

            <div className="relative z-10 text-center px-6">

                {/* --- 404 TEXT WITH GLOW --- */}
                <h1 className="text-[150px] md:text-[200px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 leading-none drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-bounce-slow">
                    404
                </h1>

                {/* --- FLOATING ICON --- */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 blur-sm animate-spin-slow pointer-events-none">
                    <FaExclamationTriangle size={300} className="text-gray-700" />
                </div>

                {/* --- MESSAGE CARD --- */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl max-w-lg mx-auto mt-[-40px] relative">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Lost in Space?
                    </h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Oops! The page you are looking for doesn't exist or has been moved.
                        Let's get you back on track.
                    </p>

                    {/* --- HOME BUTTON --- */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/40"
                    >
                        <FaHome /> Back to Home
                    </Link>
                </div>

            </div>

            {/* --- CSS FOR SLOW BOUNCE --- */}
            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(-5%); }
                    50% { transform: translateY(5%); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 6s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default NotFound;