import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProject = () => {
    // State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [techStack, setTechStack] = useState('');
    const [gitLink, setGitLink] = useState('');
    const [liveLink, setLiveLink] = useState('');
    const [image, setImage] = useState(null); // Image file state

    const [loading, setLoading] = useState(false);

    // Form Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let imageUrl = null;

        try {
            // --- STEP 1: Upload Image to ImgBB ---
            if (image) {
                const imgFormData = new FormData();
                imgFormData.append('image', image);

                // Tera ImgBB Key
                const IMGBB_API_KEY = "79d3b2cc143b05444683b68a94bd7d67";

                const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, imgFormData);
                imageUrl = imgRes.data.data.url; // URL mil gaya
                console.log("ImgBB URL:", imageUrl);
            }

            // --- STEP 2: Prepare Data for Backend (JSON) ---
            const projectData = {
                title,
                description: description, // Backend mein humne schema mein 'desc' rakha tha, check karlena
                techStack, // String hi bhej rahe hain, backend sambhal lega
                githubLink: gitLink, // Backend schema ke hisaab se name match karein
                liveLink,
                image: imageUrl // Ab URL bhej rahe hain
            };

            // --- STEP 3: Send to Backend ---
            // Backend URL update kiya hai (/add endpoint par)
            await axios.post('https://ganesh-portfolio-api.onrender.com/api/projects/add', projectData);

            toast.success('Project Added Successfully! 🚀');

            // Reset Form
            setTitle('');
            setDescription('');
            setTechStack('');
            setGitLink('');
            setLiveLink('');
            setImage(null);
            document.getElementById("fileInput").value = "";

        } catch (error) {
            console.error(error);
            toast.error('Failed to add project!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl pt-20">
            <ToastContainer theme="dark" position="top-right" />

            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
                Add New Project
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title & Tech Stack */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Project Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Tech Stack (Comma Separated)</label>
                        <input type="text" value={techStack} onChange={(e) => setTechStack(e.target.value)} required className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none" placeholder="React, Node, MongoDB" />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"></textarea>
                </div>

                {/* IMAGE UPLOAD INPUT */}
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">Project Image</label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-300 focus:border-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">GitHub Link</label>
                        <input type="url" value={gitLink} onChange={(e) => setGitLink(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Live Demo Link</label>
                        <input type="url" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                    {loading ? 'Uploading...' : '🚀 Publish Project'}
                </button>
            </form>
        </div>
    );
};

export default AddProject;