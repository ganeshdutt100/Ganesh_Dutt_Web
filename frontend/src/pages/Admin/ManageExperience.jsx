import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBriefcase, FaTrash, FaPlus, FaBuilding, FaCalendarAlt, FaTimes, FaTag } from 'react-icons/fa';

const ManageExperience = () => {
    const [experiences, setExperiences] = useState([]);

    // 👇 Form state mein 'tags' array add kiya
    const [form, setForm] = useState({
        role: '', company: '', duration: '', description: '', location: '', tags: []
    });

    // 👇 Sirf input field ke liye state
    const [tagInput, setTagInput] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch
    const fetchExp = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/experience');
            setExperiences(res.data);
        } catch (error) { console.error(error); }
    };
    useEffect(() => { fetchExp(); }, []);

    // Handle Input Text
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // --- TAGS HANDLING ---
    const handleAddTag = (e) => {
        e.preventDefault(); // Form submit hone se roko
        if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
            setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setForm({ ...form, tags: form.tags.filter(t => t !== tagToRemove) });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Enter dabane par form submit nahi hona chahiye, bas tag add ho
            handleAddTag(e);
        }
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/experience/add', form);
            fetchExp();
            // Reset Form
            setForm({ role: '', company: '', duration: '', description: '', location: '', tags: [] });
            setTagInput('');
        } catch (error) { alert("Error adding experience"); }
        finally { setLoading(false); }
    };

    // Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this experience?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/experience/delete/${id}`);
            fetchExp();
        } catch (error) { alert("Error deleting"); }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaBriefcase className="text-blue-500" /> Manage Experience
            </h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Role & Company */}
                <input name="role" value={form.role} onChange={handleChange} placeholder="Job Title (e.g. MERN Developer)" className="bg-gray-800 p-3 rounded text-white border border-gray-600 outline-none focus:border-blue-500" required />
                <input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" className="bg-gray-800 p-3 rounded text-white border border-gray-600 outline-none focus:border-blue-500" required />

                {/* Duration & Location */}
                <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (e.g. Jan 2024 - Present)" className="bg-gray-800 p-3 rounded text-white border border-gray-600 outline-none focus:border-blue-500" required />
                <input name="location" value={form.location} onChange={handleChange} placeholder="Location (e.g. Remote)" className="bg-gray-800 p-3 rounded text-white border border-gray-600 outline-none focus:border-blue-500" />

                {/* Description */}
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short Description..." className="bg-gray-800 p-3 rounded text-white border border-gray-600 outline-none md:col-span-2 focus:border-blue-500" rows="2" />

                {/* --- TAGS INPUT SECTION --- */}
                <div className="md:col-span-2">
                    <label className="text-gray-400 text-sm mb-1 block">Skills / Tech Stack Used</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a skill and press Enter (e.g. React.js)"
                            className="flex-1 bg-gray-800 p-3 rounded text-white border border-gray-600 outline-none focus:border-blue-500"
                        />
                        <button type="button" onClick={handleAddTag} className="bg-gray-700 hover:bg-gray-600 text-white px-4 rounded border border-gray-600">
                            Add
                        </button>
                    </div>

                    {/* Tags Display Area */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {form.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-blue-800">
                                {tag}
                                <button type="button" onClick={() => handleRemoveTag(tag)} className="text-red-400 hover:text-red-300">
                                    <FaTimes size={12} />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded md:col-span-2 flex items-center justify-center gap-2 mt-2">
                    {loading ? "Adding..." : <><FaPlus /> Add Experience</>}
                </button>
            </form>

            {/* LIST */}
            <div className="space-y-4">
                {experiences.map((exp) => (
                    <div key={exp._id} className="bg-gray-900 p-4 rounded-xl border border-gray-700 flex justify-between items-start group hover:border-blue-500 transition-all">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                            <p className="text-blue-400 font-semibold flex items-center gap-2"><FaBuilding size={12} /> {exp.company}</p>
                            <p className="text-gray-500 text-sm flex items-center gap-2 mb-2"><FaCalendarAlt size={12} /> {exp.duration} | {exp.location}</p>

                            {/* Display Tags in List */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {exp.tags && exp.tags.map((tag, i) => (
                                    <span key={i} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded border border-gray-700">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => handleDelete(exp._id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all ml-4">
                            <FaTrash />
                        </button>
                    </div>
                ))}
                {experiences.length === 0 && <p className="text-gray-500 text-center">No experience added yet.</p>}
            </div>
        </div>
    );
};

export default ManageExperience;