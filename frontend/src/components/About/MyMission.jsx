import React from 'react'
import { FaLaptopCode, FaChalkboardTeacher, FaLightbulb } from 'react-icons/fa';

const MyMission = () => {
    return (
        <div>
            {/* --- SECTION 2: WHAT I DO (MISSION) --- */}
            <div className="my-24">
                <h2 className="text-3xl font-bold text-center text-white mb-12" data-aos="zoom-in">
                    My <span className="text-blue-500">Mission</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="zoom-in" data-aos-delay="200">
                    {/* Card 1 */}
                    <div className="bg-gray-800/50 backdrop-blur-md p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 group" >
                        <div className="w-14 h-14 bg-blue-900/30 rounded-lg flex items-center justify-center text-2xl text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                            <FaLaptopCode />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Development</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Building robust web applications using the MERN stack. I focus on clean architecture, API security, and responsive UI design.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-800/50 backdrop-blur-md p-8 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 group" >
                        <div className="w-14 h-14 bg-purple-900/30 rounded-lg flex items-center justify-center text-2xl text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                            <FaChalkboardTeacher />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Training</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Breaking down complex coding concepts into simple, digestible lessons. Trained 500+ students to become job-ready developers.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-800/50 backdrop-blur-md p-8 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2 group" >
                        <div className="w-14 h-14 bg-green-900/30 rounded-lg flex items-center justify-center text-2xl text-green-400 mb-6 group-hover:scale-110 transition-transform">
                            <FaLightbulb />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Mentorship</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Guiding aspiring developers on career paths, resume building, and cracking technical interviews in the tech industry.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyMission