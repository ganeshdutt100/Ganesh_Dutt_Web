import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCog, FaSave, FaCamera } from 'react-icons/fa';

const Settings = () => {
    const [formData, setFormData] = useState({
        name: '', title: '', email: '', phone: '', about: '',
        github: '', linkedin: '', twitter: '', instagram: '',
        adminName: '', adminTitle: '' // Naye fields
    });
    const [logoFile, setLogoFile] = useState(null); // Logo file state
    const [preview, setPreview] = useState(null); // Preview ke liye
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    // Fetch Data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/profile');
                if (res.data) {
                    setFormData(res.data);
                    // Agar pehle se logo hai to preview dikhao
                    if (res.data.adminLogo) {
                        setPreview(`http://localhost:5000/uploads/${res.data.adminLogo}`);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Image Change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setLogoFile(file);
        setPreview(URL.createObjectURL(file)); // Turant dikhane ke liye
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const data = new FormData();
        // Saare text fields append karo
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key] || '');
        });
        // Image append karo
        if (logoFile) {
            data.append('adminLogo', logoFile);
        }

        try {
            const res = await axios.put('http://localhost:5000/api/profile/update', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage("✅ " + res.data.message);
            // Page reload karne ki zaroorat pad sakti hai taaki Sidebar update ho jaye
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            setMessage("❌ Error updating profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaUserCog className="text-blue-500" /> Admin Settings
            </h2>

            {message && <div className="bg-green-900/50 text-green-400 p-3 rounded mb-4">{message}</div>}

            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl space-y-8">

                {/* --- 1. ADMIN DASHBOARD APPEARANCE (Jo tumne manga) --- */}
                <div>
                    <h3 className="text-xl font-semibold text-blue-400 border-b border-gray-700 pb-2 mb-4">
                        Dashboard Appearance (Sidebar)
                    </h3>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Logo Upload */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-24 h-24 rounded-xl bg-gray-700 border-2 border-dashed border-gray-500 flex items-center justify-center overflow-hidden relative group">
                                {preview ? (
                                    <img src={preview} alt="Logo" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-gray-400 text-2xl font-bold">GD</span>
                                )}
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <FaCamera className="text-white text-2xl" />
                                </div>
                                <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                            </div>
                            <span className="text-sm text-gray-400">Admin Logo</span>
                        </div>

                        {/* Inputs */}
                        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Dashboard Title</label>
                                <input type="text" name="adminTitle" value={formData.adminTitle || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white" placeholder="Ex: Admin Panel" />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Welcome Name</label>
                                <input type="text" name="adminName" value={formData.adminName || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white" placeholder="Ex: Ganesh" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 2. PUBLIC PROFILE INFO (Purana wala) --- */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-300 border-b border-gray-700 pb-2 mb-4">Public Profile Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white" />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Job Title</label>
                            <input type="text" name="title" value={formData.title || ''} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white" />
                        </div>
                        {/* Baaki inputs same rahenge... */}
                    </div>
                </div>

                <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 w-full justify-center md:w-auto">
                    {loading ? "Saving..." : <><FaSave /> Save Changes</>}
                </button>
            </form>
        </div>
    );
};

export default Settings;