import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';

const CallToAction = () => {
    return (
        <div className="relative py-24 bg-gray-900 overflow-hidden">

            {/* --- Background Effects (Glow) --- */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>

            {/* Optional: Mesh Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10" data-aos="zoom-in">

                {/* Heading */}
                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                    Have a Project in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Mind?</span>
                </h2>

                {/* Sub-text */}
                <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                    Let's turn your idea into a digital reality. Whether it's a complex web app or a simple portfolio, I'm ready to build it.
                </p>

                {/* CTA Button */}
                <Link
                    to="/contact" // Ya fir 'mailto:tera-email@gmail.com'
                    className="group relative inline-flex items-center gap-3 px-10 py-4 bg-blue-600 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:bg-blue-500 hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_40px_rgba(37,99,235,0.8)]"
                >
                    {/* Rocket Icon Animation */}
                    <FaRocket className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Let's Talk Business</span>
                </Link>

                {/* Trust Badge (Optional) */}
                <p className="mt-8 text-sm text-gray-500">
                    Reply time: Within 24 Hours • 100% Confidential
                </p>

            </div>
        </div>
    );
};

export default CallToAction;