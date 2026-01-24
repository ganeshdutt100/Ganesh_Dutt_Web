import React from 'react';

const Preloader = () => {
    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
                {/* Animated Spinner/Logo Area */}
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                <h2 className="text-white mt-4 text-xl font-semibold tracking-wider animate-pulse">
                    LOADING EXPERIENCE...
                </h2>
            </div>
        </div>
    );
};

export default Preloader;