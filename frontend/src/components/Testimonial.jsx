import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { FaQuoteLeft, FaPlus, FaTimes, FaPaperPlane, FaStar, FaCamera } from 'react-icons/fa';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form States
    const [newReview, setNewReview] = useState({ name: '', role: '', message: '', rating: 5 });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const fetchReviews = async () => {
        try {
            const res = await axios.get('https://ganesh-portfolio-api.onrender.com/api/testimonials');
            setReviews(res.data);
        } catch (error) { console.error("Error fetching reviews", error); }
    };

    useEffect(() => { fetchReviews(); }, []);

    // --- SLIDER SETTINGS ---
    const settings = {
        dots: true,
        className: "center",
        centerMode: reviews.length >= 3,
        infinite: reviews.length >= 3,
        centerPadding: "0px",
        slidesToShow: reviews.length < 3 ? 1 : 3,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        focusOnSelect: true,
        arrows: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 1, centerMode: true, centerPadding: "60px" } },
            { breakpoint: 640, settings: { slidesToShow: 1, centerMode: true, centerPadding: "20px" } }
        ]
    };

    const handleInputChange = (e) => setNewReview({ ...newReview, [e.target.name]: e.target.value });
    const handleRating = (value) => setNewReview({ ...newReview, rating: value });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        let imageUrl = null;

        try {
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);
                const IMGBB_API_KEY = "79d3b2cc143b05444683b68a94bd7d67";
                const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
                imageUrl = imgRes.data.data.url;
            }

            const reviewData = {
                name: newReview.name,
                role: newReview.role,
                message: newReview.message,
                rating: newReview.rating,
                image: imageUrl
            };

            await axios.post('https://ganesh-portfolio-api.onrender.com/api/testimonials/add', reviewData);

            alert("Thanks for your review! 🚀");
            setIsModalOpen(false);
            setNewReview({ name: '', role: '', message: '', rating: 5 });
            setImageFile(null);
            setPreview(null);
            fetchReviews();
        } catch (error) {
            console.error(error);
            alert("Error submitting review.");
        } finally {
            setSubmitting(false);
        }
    };

    const renderStars = (count) => {
        return [...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < count ? "text-yellow-400" : "text-gray-600"} size={14} />
        ));
    };

    // --- 🔥 UPDATED CSS (BLUR REMOVED) ---
    const styles = `
        .testimonial-wrapper { padding-bottom: 50px; }
        
        /* Default Slide (Side Cards) - NO BLUR */
        .slick-slide { 
            transition: all 0.5s ease-in-out; 
            transform: scale(0.95); /* Thoda chhota */
            opacity: 0.6;           /* Thoda dim, par saaf */
            z-index: 1; 
        }

        /* Active Slide (Center Card) */
        .slick-center { 
            transform: scale(1.05); /* Thoda bada */
            opacity: 1;             /* Full visible */
            z-index: 10; 
            position: relative; 
        }

        .slick-center .testimonial-card { 
            background: rgba(17, 24, 39, 0.95); 
            border: 1px solid #3b82f6; 
            box-shadow: 0px 10px 40px -10px rgba(59, 130, 246, 0.6); 
        }

        .slick-dots { bottom: -40px; }
        .slick-dots li button:before { font-size: 10px; color: gray; opacity: 0.5; }
        .slick-dots li.slick-active button:before { font-size: 14px; color: #3b82f6; opacity: 1; }
        
        /* Modal Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1f2937; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
    `;

    return (
        <section className="py-24 bg-gray-900 relative overflow-hidden" id="testimonials">
            <style>{styles}</style>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 px-4" data-aos="fade-up">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Student <span className="text-blue-500">Stories</span>
                        </h2>
                        <p className="text-gray-400 max-w-lg text-lg">Feedback from students who built their careers.</p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all font-semibold">
                        <FaPlus /> Add Your Story
                    </button>
                </div>

                {reviews.length > 0 ? (
                    <div className="testimonial-wrapper">
                        <Slider key={reviews.length} {...settings}>
                            {reviews.map((review) => (
                                <div key={review._id} className="py-10 px-2 outline-none">
                                    <div className="testimonial-card bg-gray-800/50 backdrop-blur-md p-8 rounded-3xl border border-gray-700/50 h-[420px] flex flex-col justify-between transition-all duration-300 relative overflow-hidden cursor-grab">
                                        <FaQuoteLeft className="text-4xl text-blue-500/20 mb-4" />
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex gap-1 mb-2">{renderStars(review.rating || 5)}</div>
                                            <p className="text-gray-300 text-lg italic leading-relaxed line-clamp-5">"{review.message}"</p>
                                        </div>
                                        <div className="flex items-center gap-4 border-t border-gray-700/50 pt-4 mt-4">
                                            <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 to-purple-600 shrink-0 shadow-lg">
                                                <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden flex items-center justify-center">
                                                    {review.image ? (
                                                        <img
                                                            src={review.image}
                                                            alt={review.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=User"; }}
                                                        />
                                                    ) : (
                                                        <span className="text-white text-lg font-bold">{review.name.charAt(0)}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg">{review.name}</h4>
                                                <p className="text-blue-400 text-sm">{review.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div className="text-center text-gray-400 py-10 border border-dashed border-gray-700 rounded-xl">
                        <p>No reviews yet. Click "Add Your Story" to be the first!</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
                    <div className="bg-gray-900 w-full max-w-lg p-6 rounded-3xl border border-gray-800 shadow-2xl relative max-h-[85vh] overflow-y-auto custom-scrollbar">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 p-2 rounded-full transition-colors"><FaTimes /></button>
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <FaQuoteLeft className="text-blue-500" /> Add Review
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex justify-center mb-4">
                                <div className="relative w-20 h-20 rounded-full bg-gray-800 border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
                                    {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover" /> : <div className="text-center text-gray-500"><FaCamera /><span className="text-[10px]">Upload</span></div>}
                                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input name="name" value={newReview.name} onChange={handleInputChange} placeholder="Name" className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none" required />
                                <input name="role" value={newReview.role} onChange={handleInputChange} placeholder="Role" className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none" required />
                            </div>
                            <div className="flex gap-2">
                                <span className="text-gray-400 text-sm mt-1">Rating:</span>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} type="button" onClick={() => handleRating(star)} className={`text-xl ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-600'}`}><FaStar /></button>
                                ))}
                            </div>
                            <textarea name="message" value={newReview.message} onChange={handleInputChange} placeholder="Your Review..." className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none resize-none" rows="3" required />
                            <button disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                                {submitting ? "Saving..." : <><FaPaperPlane /> Submit</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Testimonials;