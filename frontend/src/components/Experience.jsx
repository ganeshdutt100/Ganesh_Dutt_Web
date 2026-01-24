import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChalkboardTeacher, FaLaptopCode, FaBriefcase, FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- 1. DATA FETCHING ---
    useEffect(() => {
        const fetchExp = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/experience');
                setExperiences(res.data);
            } catch (error) {
                console.error("Error fetching experience:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExp();
    }, []);

    // --- 2. ICON HELPER (Automatic Icon Selection) ---
    // Kyunki database mein Icon save nahi hota, hum Role dekh kar Icon lagayenge
    const getIcon = (role) => {
        const r = role.toLowerCase();
        if (r.includes('trainer') || r.includes('teacher') || r.includes('mentor')) return <FaChalkboardTeacher />;
        if (r.includes('developer') || r.includes('engineer') || r.includes('coder')) return <FaLaptopCode />;
        if (r.includes('student') || r.includes('intern')) return <FaGraduationCap />;
        return <FaBriefcase />; // Default Icon
    };

    // --- 3. TAGS GENERATOR ---
    // Database mein tags nahi hain, toh hum Location aur Role se tags bana denge
    const getTags = (item) => {
        const tags = [item.location || "On-Site"]; // Location pehla tag
        if (item.role.includes("Full Stack")) tags.push("Full Stack");
        if (item.role.includes("MERN")) tags.push("MERN Stack");
        if (item.company.includes("Training")) tags.push("Training");
        return tags.length > 1 ? tags : [...tags, "Professional"]; // Kam se kam 2 tag dikhe
    };

    if (loading) return <div className="py-20 bg-gray-900 text-center text-white">Loading Timeline...</div>;

    return (
        <div className="py-20 bg-gray-900 relative" id="experience">
            <div className="max-w-4xl mx-auto px-6">

                {/* --- HEADER --- */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                        My Professional <span className="text-blue-500">Journey</span>
                    </h2>
                    <p className="text-gray-400">
                        From writing my first "Hello World" to training hundreds of developers.
                    </p>
                </div>

                {/* --- TIMELINE CONTAINER --- */}
                <div className="relative">

                    {/* 1. THE VERTICAL LINE (Dandi) */}
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-gray-800 rounded-full"></div>

                    {/* --- TIMELINE ITEMS --- */}
                    <div className="space-y-12">
                        {experiences.length > 0 ? (
                            experiences.map((item, index) => (
                                <div
                                    key={item._id}
                                    className={`relative flex items-center md:justify-between ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                        }`}
                                    data-aos="fade-up"
                                >

                                    {/* 2. THE DOT (Icon Marker) */}
                                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-900 border-4 border-blue-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                                        <span className="text-white text-lg">
                                            {getIcon(item.role)}
                                        </span>
                                    </div>

                                    {/* Empty Space for Desktop Alignment */}
                                    <div className="hidden md:block w-5/12"></div>

                                    {/* 3. THE CARD (Content) */}
                                    <div className="ml-20 md:ml-0 w-full md:w-5/12">
                                        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] group hover:-translate-y-1">

                                            {/* Date Tag */}
                                            <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-blue-300 bg-blue-900/30 rounded-full border border-blue-800">
                                                {item.duration}
                                            </span>

                                            {/* Role & Company */}
                                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {item.role}
                                            </h3>
                                            <h4 className="text-md text-gray-400 font-medium mb-3">
                                                {item.company}
                                            </h4>

                                            {/* Description */}
                                            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                                                {item.description}
                                            </p>

                                            {/* Tags (Generated Dynamically) */}
                                            <div className="flex flex-wrap gap-2">
                                                {getTags(item).map((tag, i) => (
                                                    <span key={i} className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded border border-gray-700">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 ml-12">
                                <p>No experience added yet via Admin Panel.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;