import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ui/ProjectCard';
import { FaPlus, FaUserSecret, FaEye, FaEyeSlash } from 'react-icons/fa';

const Projects = () => {
    // --- STATES ---
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modals visibility
    const [isModalOpen, setIsModalOpen] = useState(false);      // Main Form
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // Security Gate

    // Security Data
    const [adminKey, setAdminKey] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Project Form Data
    const [formData, setFormData] = useState({
        title: '', description: '', techStack: '', gitLink: '', liveLink: ''
    });
    const [imageFile, setFile] = useState(null);

    // --- 1. LOAD PROJECTS ---
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('https://ganesh-portfolio-api.onrender.com/api/projects');
            const data = await res.json();
            setProjects(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    // --- 2. SECURITY HANDLERS ---
    const handleAddClick = () => {
        setIsAuthModalOpen(true);
        setAdminKey("");
        setShowPassword(false);
    };

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://ganesh-portfolio-api.onrender.com/api/admin/verify-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: adminKey })
            });
            const data = await res.json();

            if (data.success) {
                setIsAuthModalOpen(false);
                setIsModalOpen(true);
            } else {
                alert("🚨 ACCESS DENIED! Wrong Password.");
                setAdminKey("");
            }
        } catch (error) {
            console.error("Verification Error:", error);
            alert("Server Error! Backend check karo.");
        }
    };

    // --- 3. FORM HANDLERS ---
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsAuthModalOpen(false);
        setAdminKey("");
        setFile(null);
    };

    // --- MAIN SUBMIT (With ImgBB Logic) ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = null;

        try {
            // 1. ImgBB Upload
            if (imageFile) {
                const imgFormData = new FormData();
                imgFormData.append('image', imageFile);

                // Tera ImgBB Key
                const IMGBB_API_KEY = "79d3b2cc143b05444683b68a94bd7d67";

                const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                    method: 'POST',
                    body: imgFormData
                });

                const imgData = await imgRes.json();
                imageUrl = imgData.data.url;
                console.log("Uploaded Image:", imageUrl);
            }

            // 2. Send Data to Backend (JSON Format)
            const projectPayload = {
                title: formData.title,
                description: formData.description,
                techStack: formData.techStack.split(',').map(item => item.trim()), // Convert string to array
                gitLink: formData.gitLink,
                liveLink: formData.liveLink,
                image: imageUrl // Send URL
            };

            const res = await fetch('https://ganesh-portfolio-api.onrender.com/api/projects/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Important for JSON
                    'admin-secret': adminKey // Security Check
                },
                body: JSON.stringify(projectPayload)
            });

            const result = await res.json();

            if (res.ok) {
                alert('✅ Project Added Successfully!');
                setIsModalOpen(false);
                setAdminKey("");
                setFormData({ title: '', description: '', techStack: '', gitLink: '', liveLink: '' });
                setFile(null);
                fetchProjects();
            } else {
                alert(`❌ Error: ${result.message}`);
            }
        } catch (error) {
            console.error(error);
            alert("Server Error or Image Upload Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 pt-24 relative">

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-12 border-b border-gray-800 pb-6">
                <h1 className="text-4xl font-bold mb-2">My <span className="text-blue-500">Projects</span></h1>
                <p className="text-gray-400">Secured Archive of my work.</p>
            </div>

            {/* Projects Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? <p className="text-gray-400">Loading...</p> : projects.map((project) => <ProjectCard key={project._id} project={project} />)}
            </div>

            {/* --- FLOATING ADD BUTTON --- */}
            <button onClick={handleAddClick} className="fixed bottom-7 right-7 z-40 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl transition hover:scale-110">
                <FaPlus size={24} />
            </button>

            {/* --- 1. AUTH MODAL --- */}
            {isAuthModalOpen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-[60] p-4">
                    <div className="bg-gray-800 border border-red-500/50 p-8 rounded-2xl w-full max-w-sm text-center shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                        <div className="flex justify-center mb-4 text-red-500"><FaUserSecret size={50} /></div>
                        <h2 className="text-2xl font-bold mb-2 text-white">Identity Verification</h2>
                        <p className="text-gray-400 mb-6 text-sm">Restricted Area. Identify yourself.</p>

                        <form onSubmit={handleAuthSubmit} autoComplete="off">
                            <div className="relative mb-6">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="search_query_verifier"
                                    autoComplete="off"
                                    readOnly onFocus={(e) => e.target.removeAttribute('readonly')}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white text-center tracking-widest text-xl focus:border-red-500 focus:outline-none pr-10"
                                    placeholder="Enter Code"
                                    value={adminKey}
                                    onChange={(e) => setAdminKey(e.target.value)}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition">
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => setIsAuthModalOpen(false)} className="flex-1 py-2 text-gray-400 hover:text-white">Cancel</button>
                                <button type="submit" className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold">Access</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- 2. MAIN PROJECT FORM --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
                    <div className="bg-gray-800 border border-blue-500/30 p-6 rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full bg-gray-700 rounded p-2 text-white" />
                            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full bg-gray-700 rounded p-2 text-white"></textarea>

                            <div>
                                <label className="text-sm text-gray-400">Upload Image</label>
                                <input type="file" onChange={handleFileChange} className="w-full bg-gray-700 rounded p-2 text-white" />
                            </div>

                            <input name="techStack" value={formData.techStack} onChange={handleChange} placeholder="Tech Stack (React, Node)" className="w-full bg-gray-700 rounded p-2 text-white" />
                            <div className="flex gap-2">
                                <input name="gitLink" value={formData.gitLink} onChange={handleChange} placeholder="GitHub URL" className="w-full bg-gray-700 rounded p-2 text-white" />
                                <input name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder="Live URL" className="w-full bg-gray-700 rounded p-2 text-white" />
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={handleCancel} className="text-gray-300 hover:text-white">Cancel</button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 shadow-lg">Save Project</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;