import React, { useState, useEffect } from 'react';

const Preloader = () => {
    // Status text change karne ka logic (Thoda techy feel dene ke liye)
    const [text, setText] = useState("LOADING SYSTEM");

    useEffect(() => {
        const timer1 = setTimeout(() => setText("INITIALIZING..."), 1200);
        const timer2 = setTimeout(() => setText("LOADING ASSETS..."), 2400);
        const timer3 = setTimeout(() => setText("WELCOME, GANESH"), 3500);

        return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
    }, []);

    return (
        <div className="fixed inset-0 bg-[#050b14] z-[9999] flex flex-col items-center justify-center overflow-hidden">

            {/* Background Atmosphere (Blue Haze) */}
            <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>

            {/* --- REACTOR ANIMATION --- */}
            <div className="relative w-32 h-32 mb-10 flex items-center justify-center">

                {/* 1. Outer Rotating Ring (Slow & Blue) */}
                <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-[spin_3s_linear_infinite]"></div>
                <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-[spin_3s_linear_infinite] shadow-[0_0_15px_#3b82f6]"></div>

                {/* 2. Middle Rotating Ring (Fast & Purple & Reverse) */}
                <div className="absolute inset-4 border-2 border-purple-500/30 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
                <div className="absolute inset-4 border-r-2 border-purple-500 rounded-full animate-[spin_2s_linear_infinite_reverse] shadow-[0_0_15px_#a855f7]"></div>

                {/* 3. Inner Core (Breathing) */}
                <div className="absolute inset-0 m-auto w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-0 m-auto w-8 h-8 bg-white rounded-full shadow-[0_0_30px_white]"></div>
            </div>

            {/* --- NAME & STATUS --- */}
            <div className="z-10 text-center relative">
                {/* Glowing Name */}
                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-400 tracking-[0.2em] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-in fade-in zoom-in duration-1000">
                    GANESH DUTT
                </h1>

                {/* Tech Line */}
                <div className="w-48 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-4 mb-4"></div>

                {/* Dynamic Status Text */}
                <p className="text-blue-400 font-mono text-sm tracking-widest uppercase animate-pulse">
                    {text}
                    <span className="inline-block w-1 h-3 ml-1 bg-blue-400 animate-blink align-middle"></span>
                </p>
            </div>

            {/* Custom Animations for Tailwind (Inline styles for quick fix) */}
            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .animate-blink {
                    animation: blink 1s infinite;
                }
            `}</style>
        </div>
    );
};

export default Preloader;