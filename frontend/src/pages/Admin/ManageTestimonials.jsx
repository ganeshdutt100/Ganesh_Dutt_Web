import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCommentAlt, FaTrash, FaPlus, FaUserTie, FaStar, FaCamera, FaTimes } from 'react-icons/fa';

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form States
    const [form, setForm] = useState({ name: '', role: '', message: '', rating: 5 });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // Fetch Data
    const fetchData = async () => {
        try {
            const res = await axios.get('https://ganesh-portfolio-api.onrender.com/api/testimonials');
            setTestimonials(res.data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { fetchData(); }, []);

    // Handle Input
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // Handle Rating
    const handleRating = (value) => setForm({ ...form, rating: value });

    // Handle Image Selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Remove Selected Image
    const clearImage = () => {
        setImageFile(null);
        setPreview(null);
    };

    // --- MAIN SUBMIT FUNCTION (ImgBB Logic) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let imageUrl = null; // Default agar photo nahi daali

        try {
            // 1. Agar Photo select ki hai to ImgBB pe upload karo
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);

                // 👇 APNI IMGBB API KEY YAHAN DAALNA (Wahi same jo frontend mein use ki thi)
                const IMGBB_API_KEY = "79d3b2cc143b05444683b68a94bd7d67";

                const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
                imageUrl = imgRes.data.data.url; // ImgBB se URL mil gaya
            }

            // 2. Ab Data Backend ko bhejo (Simple JSON)
            const testimonialData = {
                name: form.name,
                role: form.role,
                message: form.message,
                rating: form.rating,
                image: imageUrl // URL bhej rahe hain
            };

            await axios.post('https://ganesh-portfolio-api.onrender.com/api/testimonials/add', testimonialData);

            // Success & Reset
            fetchData();
            setForm({ name: '', role: '', message: '', rating: 5 });
            clearImage();
            alert("Review Added Successfully!");

        } catch (error) {
            console.error("Error:", error);
            alert("Error adding testimonial. Check console.");
        } finally {
            setLoading(false);
        }
    };

    // Delete Function
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this review?")) return;
        try {
            await axios.delete(`https://ganesh-portfolio-api.onrender.com/api/testimonials/delete/${id}`);
            fetchData();
        } catch (error) { alert("Error deleting"); }
    };

    // Helper for Stars
    const renderStars = (count) => {
        return [...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < count ? "text-yellow-400" : "text-gray-600"} size={12} />
        ));
    };

    return (
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaCommentAlt className="text-blue-500" /> Manage Testimonials
            </h2>

            {/* --- ADD FORM --- */}
            <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Image Upload Area */}
                <div className="md:col-span-2 flex justify-center">
                    <div className="relative w-24 h-24 rounded-full bg-gray-800 border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden group hover:border-blue-500 transition-colors">
                        {preview ? (
                            <>
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                <button type="button" onClick={clearImage} className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <FaTimes />
                                </button>
                            </>
                        ) : (
                            <div className="text-center text-gray-400 cursor-pointer">
                                <FaCamera className="mx-auto mb-1" />
                                <span className="text-xs">Photo</span>
                            </div>
                        )}
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    </div>
                </div>

                {/* Text Inputs */}
                <input name="name" value={form.name} onChange={handleChange} placeholder="Student Name" className="bg-gray-800 p-3 rounded text-white border border-gray-600 outline-none focus:border-blue-500" required />
                <input name="role" value={form.role} onChange={handleChange} placeholder="Role (e.g. SDE at Wipro)" className="bg-gray-800 p-3 rounded text-white border border-gray-600 outline-none focus:border-blue-500" required />

                {/* Rating Selection */}
                <div className="md:col-span-2 flex items-center gap-3">
                    <span className="text-gray-400 text-sm">Rating:</span>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => handleRating(star)}
                                className={`text-xl transition-colors ${star <= form.rating ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-200'}`}
                            >
                                <FaStar />
                            </button>
                        ))}
                    </div>
                </div>

                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Student's Review..." className="bg-gray-800 p-3 rounded text-white border border-gray-600 outline-none md:col-span-2 focus:border-blue-500" rows="3" required />

                <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded md:col-span-2 flex items-center justify-center gap-2">
                    {loading ? "Uploading..." : <><FaPlus /> Add Review</>}
                </button>
            </form>

            {/* --- LIST DISPLAY --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((test) => (
                    <div key={test._id} className="bg-gray-900 p-4 rounded-xl border border-gray-700 relative group hover:border-blue-500 transition-all">
                        <div className="flex items-center gap-3 mb-2">
                            {/* Display Image */}
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 border border-gray-600">
                                {test.image ? (
                                    <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-blue-400 bg-blue-900/30">
                                        <FaUserTie />
                                    </div>
                                )}
                            </div>

                            <div>
                                <h4 className="font-bold text-white">{test.name}</h4>
                                <p className="text-xs text-gray-400">{test.role}</p>
                                <div className="flex gap-0.5 mt-1">
                                    {renderStars(test.rating || 5)}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm italic mt-2">"{test.message}"</p>

                        <button onClick={() => handleDelete(test._id)} className="absolute top-4 right-4 text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageTestimonials;