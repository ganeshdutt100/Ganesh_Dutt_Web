import React from 'react'
import { FaUserGraduate, FaUniversity, FaSchool } from 'react-icons/fa';

const Education = () => {
    // --- 1. YAHAN APNI EDUCATION DETAILS EDIT KAR LE ---
    const educationData = [
        {
            id: 1,
            degree: "Bachelor Of Science (CS)",
            institution: "DBRAU Agra University",
            year: "2019 - 2022",
            title: 'Rajiv Academy For Technology & Management Mathura',
            description: "Graduated with a focus on Software Development, Data Structures, and Computer Science fundamentals."
        },
        {
            id: 2,
            degree: "Senior Secondary (12th Grade)",
            institution: "UP Board",
            year: "2017 - 2018",
            title: 'M.D.B inter collage ,Ole(Mathura) 281122',

            description: "Completed with a focus on Science (Physics, Chemistry, Mathematics)."
        },
        // Agar aur add karna hai to yahan copy paste kar lena
    ];

    return (
        <div>
            {/* --- SECTION 3: EDUCATION (STATIC - NO BACKEND) --- */}
            <div className="mb-24">
                <h2 className="text-3xl font-bold text-center text-white mb-12" data-aos="fade-up">
                    Education & <span className="text-blue-500">Certifications</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {educationData.map((edu, index) => (
                        <div
                            key={edu.id}
                            className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-start gap-4 hover:border-blue-500 transition-all"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-blue-400 text-xl shrink-0">
                                <FaUserGraduate />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                                <p className="text-blue-400 font-medium flex items-center gap-2 mt-1">
                                    <FaUniversity className="text-sm" /> {edu.institution}
                                </p>
                                <p className="text-gray-300 font-medium flex items-center gap-2 mt-1">
                                    <FaSchool className="text-sm" /> {edu.title}
                                </p>
                                <p className="text-gray-500 text-sm mt-1">{edu.year}</p>
                                <p className="text-gray-400 text-sm mt-2">{edu.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Education