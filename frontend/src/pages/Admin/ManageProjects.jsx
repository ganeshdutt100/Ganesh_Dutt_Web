import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaGithub } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);

    // Fetch Projects
    const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/projects');
            setProjects(res.data.reverse()); // Latest first
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Delete Project
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await axios.delete(`http://localhost:5000/api/projects/${id}`);
                toast.success("Project Deleted!");
                fetchProjects(); // List refresh karo
            } catch (error) {
                toast.error("Error deleting project");
            }
        }
    };

    return (
        <div>
            <ToastContainer theme="dark" position="top-right" />
            <h2 className="text-2xl font-bold text-white mb-6">Manage Projects ({projects.length})</h2>

            <div className="grid gap-4">
                {projects.map((project) => (
                    <div key={project._id} className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex items-center justify-between group hover:border-blue-500 transition-colors">

                        <div className="flex items-center gap-4">
                            {/* Tiny Image Thumbnail */}
                            <img
                                src={
                                    project.image
                                        ? `http://localhost:5000/${project.image}`  // Backend URL Joda
                                        : "https://via.placeholder.com/50"
                                }
                                alt="thumb"
                                className="w-16 h-16 rounded-lg object-cover bg-gray-700"
                                // Agar image load na ho to placeholder dikhane ke liye:
                                onError={(e) => { e.target.src = "https://via.placeholder.com/50"; }}
                            />

                            <div>
                                <h3 className="font-bold text-white text-lg">{project.title}</h3>
                                <p className="text-xs text-gray-400 line-clamp-1">{project.description}</p>
                                <div className="flex gap-2 mt-2">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="text-[10px] bg-gray-900 px-2 py-0.5 rounded text-blue-300 border border-gray-700">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            {/* <button className="p-2 bg-gray-700 hover:bg-blue-600 text-white rounded-lg transition-colors">
                                <FaEdit />
                            </button> */}
                            <button
                                onClick={() => handleDelete(project._id)}
                                className="p-2 bg-gray-700 hover:bg-red-600 text-white rounded-lg transition-colors"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProjects;