import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaLaptopCode } from 'react-icons/fa';

const ManageSkills = () => {
    const [skills, setSkills] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Frontend'); // Default Select
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // FETCH
    const fetchSkills = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/skills');
            setSkills(res.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    useEffect(() => { fetchSkills(); }, []);

    // ADD SKILL
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !image) return alert("All fields are required!");

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category); // <--- Category Bheji
        formData.append('image', image);

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/skills/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchSkills();
            setName('');
            setImage(null);
            document.getElementById('fileInput').value = "";
        } catch (error) {
            alert("Error adding skill");
        } finally {
            setLoading(false);
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this skill?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/skills/delete/${id}`);
            fetchSkills();
        } catch (error) {
            alert("Error deleting");
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaLaptopCode className="text-blue-500" /> Manage Skills
            </h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                {/* 1. Name */}
                <div>
                    <label className="text-gray-400 text-sm mb-1 block">Skill Name</label>
                    <input
                        type="text"
                        placeholder="Ex: React"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 p-3 rounded text-white focus:border-blue-500 outline-none"
                    />
                </div>

                {/* 2. Category (DROPDOWN ADD KIYA) */}
                <div>
                    <label className="text-gray-400 text-sm mb-1 block">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 p-3 rounded text-white focus:border-blue-500 outline-none"
                    >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Tools">Tools/DevOps</option>
                    </select>
                </div>

                {/* 3. Image */}
                <div>
                    <label className="text-gray-400 text-sm mb-1 block">Logo</label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full bg-gray-800 border border-gray-600 p-2 rounded text-gray-300 text-sm cursor-pointer"
                    />
                </div>

                {/* 4. Button */}
                <button
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 h-[50px]"
                >
                    {loading ? "..." : <><FaPlus /> Add</>}
                </button>
            </form>

            {/* LIST */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {skills.map((skill) => (
                    <div key={skill._id} className="bg-gray-900 p-3 rounded-xl border border-gray-700 flex flex-col items-center relative group">
                        <button
                            onClick={() => handleDelete(skill._id)}
                            className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <FaTrash />
                        </button>
                        <img
                            src={`http://localhost:5000/uploads/${skill.image}`}
                            alt={skill.name}
                            className="w-10 h-10 object-contain mb-2"
                        />
                        <h3 className="text-gray-300 text-sm font-semibold">{skill.name}</h3>
                        <span className="text-xs text-gray-500">({skill.category || 'None'})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageSkills;