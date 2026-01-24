import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project }) => {

    // --- IMAGE URL LOGIC ---
    let imageUrl = "https://via.placeholder.com/400x200";
    if (project.image) {
        if (project.image.startsWith('http')) {
            imageUrl = project.image;
        } else {
            const cleanPath = project.image.replace(/\\/g, "/");
            imageUrl = `http://localhost:5000/${cleanPath}`;
        }
    }

    return (
        <div
            className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:border-blue-500/40"

        >
            {/* Project Image - Image Zoom on Hover */}
            <div className="overflow-hidden h-48 w-full relative" data-aos="fade-up"
                data-aos-delay="300">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x200"; }}
                />
            </div >

            <div className="p-5 relative z-20" data-aos="fade-left"
                data-aos-delay="300">
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-700/50 text-blue-300 border border-gray-600 rounded-md group-hover:border-blue-500/30 transition-colors">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex justify-between items-center mt-4 border-t border-gray-700 pt-4">
                    <a href={project.gitLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition hover:scale-105">
                        <FaGithub /> <span className="text-sm">Source Code</span>
                    </a>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition hover:scale-105 font-semibold">
                        <FaExternalLinkAlt /> <span className="text-sm">Live Demo</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;