import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ui/ProjectCard';
import { FaArrowRight } from 'react-icons/fa';

const FeaturedProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/projects');
                const data = await res.json();

                // --- 🔥 FIX: SORT BY DATE (Newest First) ---
                // Hum date compare kar rahe hain taaki latest wala upar aaye
                const sortedProjects = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                // Sirf Top 3 Projects utha liye
                setProjects(sortedProjects.slice(0, 3));

            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="bg-gray-900 relative">

            <div className="max-w-6xl mx-auto px-6">

                {/* --- HEADER --- */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Featured <span className="text-blue-500">Projects</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Here are some of my best works. Each project is built from scratch
                        to solve real-world problems.
                    </p>
                </div>

                {/* --- PROJECTS GRID --- */}
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-10 border border-dashed border-gray-800 rounded-xl">
                        <p>No featured projects yet. Adding soon...</p>
                    </div>
                )}

                {/* --- VIEW ALL BUTTON --- */}
                <div className="mt-16 text-center" data-aos="fade-up">
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                    >
                        View All Projects <FaArrowRight />
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default FeaturedProjects;