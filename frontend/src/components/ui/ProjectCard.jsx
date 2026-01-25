import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaImage } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 hover:border-blue-500/50 hover:shadow-blue-500/20 transition-all duration-300 group flex flex-col h-full">

            {/* --- IMAGE AREA --- */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-900 group-hover:shadow-inner">
                {!isLoaded && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-800">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse"></div>
                        <div className="relative z-20 flex flex-col items-center">
                            <FaImage className="text-gray-600 text-3xl mb-2 animate-bounce" />
                            <span className="text-gray-500 text-[10px] font-mono tracking-widest uppercase">Fetching Data...</span>
                        </div>
                    </div>
                )}

                <img
                    src={project.image || "https://via.placeholder.com/400x200?text=Project"}
                    alt={project.title}
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full h-full object-cover transform transition-all duration-700 ease-in-out
                        ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-xl'}
                    `}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
            </div>

            {/* --- CONTENT AREA --- */}
            <div className="p-6 flex flex-col flex-grow relative">

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                    {project.description}
                    {/* Note: Check karna backend se 'desc' aa rha hai ya 'description'. Maine AddProject me 'description' fix karaya tha */}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {/* Safety check: Agar techStack array nahi hai to crash na ho */}
                    {Array.isArray(project.techStack) && project.techStack.map((tech, index) => (
                        <span key={index} className="text-[10px] uppercase font-bold tracking-wider bg-gray-700/50 text-blue-300 px-2 py-1 rounded border border-gray-600/50">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-700/50">

                    {/* 👇 FIX: 'gitLink' ko 'githubLink' kar diya */}
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm hover:underline underline-offset-4">
                            <FaGithub />
                            {/* Mobile pe text chhupane ke liye 'hidden sm:inline' laga hai. Agar mobile pe dikhana hai to 'hidden' hata dena */}
                            <span className="">Source Code</span>
                        </a>
                    )}

                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer" className="ml-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-transform active:scale-95 shadow-lg shadow-blue-600/20">
                            <FaExternalLinkAlt size={12} /> Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;