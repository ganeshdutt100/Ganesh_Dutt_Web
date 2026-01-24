import React from 'react';
import { FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe, FaBriefcase, FaGraduationCap, FaCode, FaTrophy } from 'react-icons/fa';

const GaneshResume = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white pt-24 pb-10 px-4 md:px-8">

            {/* --- RESUME CONTAINER (Glassmorphism) --- */}
            <div className="max-w-5xl mx-auto bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl overflow-hidden" data-aos="fade-up">

                {/* --- 1. HEADER SECTION --- */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 border-b border-gray-700 flex flex-col md:flex-row items-center gap-8">

                    {/* Profile Image (Apni photo 'public/images/profile.jpg' mein rakhna) */}
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-500 overflow-hidden shadow-lg shrink-0" data-aos="zoom-in"
                        data-aos-delay="200">
                        <img
                            src="/images/g2.jpg" // <--- Yahan apni photo ka path check karlena
                            alt="Ganesh Dutt"
                            className="w-full h-full object-cover bg-top "

                        />
                    </div>

                    {/* Name & Title */}
                    <div className="text-center md:text-left flex-1" data-aos="flip-up" data-aos-delay="400">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                            GANESH <span className="text-blue-500">DUTT</span>
                        </h1>
                        <p className="text-xl text-gray-300 font-medium tracking-wide">FRONTEND DEVELOPER</p>
                        <p className="text-gray-400 text-sm mt-2 max-w-2xl">
                            Creative Frontend Developer with experience in building responsive and user-friendly web applications. Proficient in React, Next.js, and modern UI frameworks.
                        </p>
                    </div>

                    {/* Download Button */}
                    <a
                        href="/resume.pdf" // Public folder mein PDF rakhna mat bhoolna
                        download="Ganesh_Dutt_Resume.pdf"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg transition transform hover:scale-105" data-aos="fade-left"
                        data-aos-delay="500"
                    >
                        <FaDownload /> Download CV
                    </a>
                </div>

                {/* --- 2. MAIN GRID CONTENT --- */}
                <div className="grid grid-cols-1 md:grid-cols-12">

                    {/* --- LEFT SIDEBAR (Contact, Skills, Education) --- */}
                    <div className="md:col-span-4 bg-gray-800/60 p-6 md:p-8 border-r border-gray-700 space-y-8" data-aos="fade-right" data-aos-delay="200">

                        {/* Contact Info */}
                        <div data-aos="fade-up" data-aos-delay="400">
                            <h3 className="text-blue-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
                                <FaGlobe /> Contact
                            </h3>
                            <ul className="space-y-4 text-sm text-gray-300">
                                <li className="flex items-center gap-3">
                                    <FaPhone className="text-blue-500" /> +91 7078404837
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaEnvelope className="text-blue-500" /> webgyaan.hub@gmail.com
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-blue-500" /> Noida ,UP
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaLinkedin className="text-blue-500" /> <a href="https://www.linkedin.com/in/ganesh-dutt-514a94243/" className="hover:text-white" target='_blank' >LinkedIn Profile</a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaGithub className="text-blue-500" /> <a href="https://github.com/ganeshdutt100" className="hover:text-white" target="_blank">github.com/ganeshdutt</a>
                                </li>
                            </ul>
                        </div>

                        {/* Technical Skills */}
                        <div data-aos="fade-right" data-aos-delay="400">
                            <h3 className="text-blue-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
                                <FaCode /> Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Redux', 'Next.js', 'Express.js', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Java (Core)', 'MongoDB', 'Git & GitHub'].map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded text-xs text-white">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div data-aos="fade-left" data-aos-delay="500">
                            <h3 className="text-blue-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
                                <FaGraduationCap /> Education
                            </h3>
                            <div className="mb-4">
                                <h4 className="font-bold text-white">B.Sc Computer Science</h4>
                                <p className="text-gray-400 text-xs">DBRAU | 2019 - 2022</p>
                                <p className="text-gray-500 text-xs mt-1">Rajiv Academy, Mathura</p>
                            </div>
                        </div>

                        {/* Achievements */}
                        <div data-aos="fade-left" data-aos-delay="500">
                            <h3 className="text-blue-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
                                <FaTrophy /> Achievements
                            </h3>
                            <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4">
                                <li>1st Position in Agile Activity (Team Leader) at 4Achievers.</li>
                                <li>Frontend Development Certificate from 4Achievers.</li>
                                <li>Awarded as Best Trainer at 4Achievers.</li>
                                <li>Awarded as Best Employee at i3infosoft Pvt. Ltd.</li>
                            </ul>
                        </div>

                    </div>

                    {/* --- RIGHT CONTENT (Experience & Projects) --- */}
                    <div className="md:col-span-8 p-6 md:p-8 bg-gray-900/40">

                        {/* EXPERIENCE SECTION */}
                        <div className="mb-10" data-aos="fade-up" data-aos-delay="400">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3" data-aos="zoom-in" data-aos-delay="400">
                                <span className="bg-blue-600 p-2 rounded-lg"><FaBriefcase className="text-white text-sm" /></span>
                                Experience
                            </h3>

                            <div className="space-y-8 border-l-2 border-gray-700 ml-3 pl-8 relative">

                                {/* Job 1: VM Mining */}
                                <div className="relative" data-aos="zoom-in" data-aos-delay="400">
                                    <span className="absolute -left-[41px] top-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-gray-900"></span>
                                    <h4 className="text-xl font-bold text-white">Frontend Developer</h4>
                                    <p className="text-blue-400 text-sm font-semibold mb-2">VM Mining Technologies Pvt. Ltd | Oct 2023 - Present</p>
                                    <ul className="text-gray-400 text-sm space-y-2 list-disc pl-4">
                                        <li>Leveraged React.js, Next.js, Material UI, and Tailwind for frontend development.</li>
                                        <li>Created solutions for projects like Brajyatraa web, gaming apps, and real estate platforms.</li>
                                        <li>Built visually appealing responsive interfaces for optimal performance.</li>
                                        <li>Integrated third-party libraries to enhance project efficiency.</li>
                                    </ul>
                                </div>

                                {/* Job 2: 4Achievers */}
                                <div className="relative" data-aos="zoom-in" data-aos-delay="400">
                                    <span className="absolute -left-[41px] top-1 w-5 h-5 bg-gray-600 rounded-full border-4 border-gray-900"></span>
                                    <h4 className="text-xl font-bold text-white">Developer & Trainer</h4>
                                    <p className="text-gray-400 text-sm font-semibold mb-2">4Achievers Pvt. Ltd | July 2022 - Aug 2023</p>
                                    <ul className="text-gray-400 text-sm space-y-2 list-disc pl-4">
                                        <li>Developed training materials for HTML, CSS, JS, React.js, and Core Java.</li>
                                        <li>Conducted training sessions and assessed learners through live projects.</li>
                                        <li>Provided technical support and mentored students in web development.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* PROJECTS SECTION */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="bg-purple-600 p-2 rounded-lg"><FaCode className="text-white text-sm" /></span>
                                Key Projects
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Project 1: BrajYatraa */}
                                <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-blue-500 transition" data-aos="fade-up" data-aos-delay="400">
                                    <h4 className="font-bold text-lg text-white mb-1">BrajYatraa.com</h4>
                                    <p className="text-xs text-blue-400 mb-3">HTML, CSS, Bootstrap, JS</p>
                                    <p className="text-gray-400 text-sm mb-4">
                                        A real-world tourism platform for Braj region information and packages. Managed end-to-end development.
                                    </p>
                                    <a href="https://brajyatraa.com/" target="_blank" rel="noreferrer" className="text-sm text-white underline hover:text-blue-400">View Live Project</a>
                                </div>

                                {/* Project 2: Amazon Clone */}
                                <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-blue-500 transition" data-aos="fade-up" data-aos-delay="500">
                                    <h4 className="font-bold text-lg text-white mb-1">Amazon Clone</h4>
                                    <p className="text-xs text-blue-400 mb-3">ReactJS, Tailwind, Context API</p>
                                    <p className="text-gray-400 text-sm mb-4">
                                        E-commerce app with Sign-in, Cart, Product filtering, and automatic subtotal calculation.
                                    </p>
                                    <a href="https://complete-amazon.netlify.app" target="_blank" rel="noreferrer" className="text-sm text-white underline hover:text-blue-400">View Live Project</a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default GaneshResume;