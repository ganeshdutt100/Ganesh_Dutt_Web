import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 👈 Navigation ke liye
import { FaProjectDiagram, FaTrash, FaPlus, FaGithub, FaLink } from 'react-icons/fa';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);

    // --- FETCH DATA ---
    const fetchData = async () => {
        try {
            const res = await axios.get('https://ganesh-portfolio-api.onrender.com/api/projects');
            setProjects(res.data);
        } catch (error) { console.error("Error fetching projects:", error); }
    };

    useEffect(() => { fetchData(); }, []);

    // --- DELETE FUNCTION ---
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await axios.delete(`https://ganesh-portfolio-api.onrender.com/api/projects/delete/${id}`);
            fetchData(); // List refresh karo
        } catch (error) { alert("Error deleting project"); }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl min-h-screen">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <FaProjectDiagram className="text-purple-500" /> Manage Projects
                </h2>

                {/* 👇 Link to Your Separate Add Page */}
                <Link
                    to="/admin/add-project"
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-purple-500/30"
                >
                    <FaPlus /> Add New Project
                </Link>
            </div>

            {/* --- LIST DISPLAY (Grid) --- */}
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((proj) => (
                        <div key={proj._id} className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden group relative hover:border-purple-500 transition-all">

                            {/* Image Thumbnail */}
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={proj.image || "https://via.placeholder.com/300"}
                                    alt={proj.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h4 className="font-bold text-white text-lg mb-2">{proj.title}</h4>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{proj.desc}</p>

                                <div className="flex gap-4">
                                    {proj.githubLink && (
                                        <a href={proj.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
                                            <FaGithub /> Code
                                        </a>
                                    )}
                                    {proj.liveLink && (
                                        <a href={proj.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-gray-400 hover:text-purple-400 transition-colors">
                                            <FaLink /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Delete Button (Absolute Position) */}
                            <button
                                onClick={() => handleDelete(proj._id)}
                                className="absolute top-3 right-3 bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg transform translate-y-2 group-hover:translate-y-0"
                                title="Delete Project"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-dashed border-gray-700">
                    <p className="text-gray-400 text-lg">No projects found.</p>
                    <p className="text-gray-500 text-sm mt-2">Click the button above to add your first project.</p>
                </div>
            )}
        </div>
    );
};

export default ManageProjects;