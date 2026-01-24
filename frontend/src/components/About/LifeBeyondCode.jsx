import React from 'react'
import { FaLaptopCode, FaChalkboardTeacher, FaUserGraduate, FaDownload, FaCoffee, FaGamepad, FaLightbulb, FaUniversity } from 'react-icons/fa';

const LifeBeyondCode = () => {
    return (
        <div>
            {/* --- SECTION 4: LIFE BEYOND CODE --- */}
            <div className="bg-gray-800/30 rounded-3xl p-8 md:p-12 border border-gray-700/50" data-aos="zoom-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Life <span className="text-blue-500">Beyond Code</span>
                        </h3>
                        <p className="text-gray-400 mb-6">
                            When I'm not debugging or teaching, you can find me exploring new things. I believe a balanced mind writes better code.
                        </p>

                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-300">
                                <FaCoffee className="text-yellow-500" /> Caffeine Enthusiast (Coffee &gt; Tea)
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <FaGamepad className="text-purple-500" /> Occasional Gamer
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <FaUserGraduate className="text-blue-500" /> Constant Learner
                            </li>
                        </ul>
                    </div>
                    {/* Fun Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-900 p-4 rounded-xl text-center border border-gray-800 hover:border-blue-500 transition-colors">
                            <span className="block text-2xl font-bold text-white">2+</span>
                            <span className="text-xs text-gray-500">Years Coding</span>
                        </div>
                        <div className="bg-gray-900 p-4 rounded-xl text-center border border-gray-800 hover:border-blue-500 transition-colors">
                            <span className="block text-2xl font-bold text-white">∞</span>
                            <span className="text-xs text-gray-500">Bugs Fixed</span>
                        </div>
                        <div className="bg-gray-900 p-4 rounded-xl text-center border border-gray-800 hover:border-blue-500 transition-colors">
                            <span className="block text-2xl font-bold text-white">100%</span>
                            <span className="text-xs text-gray-500">Dedication</span>
                        </div>
                        <div className="bg-gray-900 p-4 rounded-xl text-center border border-gray-800 hover:border-blue-500 transition-colors">
                            <span className="block text-2xl font-bold text-white">WebGyaan</span>
                            <span className="text-xs text-gray-500">My Brand</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LifeBeyondCode