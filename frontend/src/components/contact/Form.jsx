import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaWhatsapp, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(null);

    // --- FORM HANDLING ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('https://ganesh-portfolio-api.onrender.com/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(null), 4000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="relative bg-gray-900 min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden" id="contact">

            {/* --- BACKGROUND GLOWS (Ambient Light) --- */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black -z-20"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[120px] animate-pulse -z-10"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-6xl w-full relative z-10">

                {/* --- HEADER --- */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Touch</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Ready to start your project or learn MERN Stack? Click below or send a message.
                    </p>
                </div>

                {/* --- GLASSMOPHISM CARD --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0  bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]" data-aos="fade-up">

                    {/* --- LEFT SIDE: CLICKABLE CONTACT INFO --- */}
                    <div className="p-10 md:p-12 bg-gradient-to-br from-white/5 to-transparent flex flex-col justify-between relative">

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8">Contact Info</h3>

                            <div className="space-y-6">

                                {/* 1. EMAIL (Click to Mail) */}
                                <a
                                    href="mailto:webgyaan.hub@gmail.com"
                                    className="flex items-center gap-5 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-transparent hover:border-white/10"
                                >
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                        <FaEnvelope size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-400 text-sm font-medium uppercase">Email Me</h4>
                                        <p className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">webgyaan.hub@gmail.com</p>
                                    </div>
                                </a>

                                {/* 2. PHONE (Click to Call) */}
                                <a
                                    href="tel:+917078404837"
                                    className="flex items-center gap-5 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-transparent hover:border-white/10"
                                >
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                        <FaPhoneAlt size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-400 text-sm font-medium uppercase">Call Me</h4>
                                        <p className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors">+91 70784 04837</p>
                                    </div>
                                </a>

                                {/* 3. WHATSAPP (Click to Chat) */}
                                <a
                                    href="https://wa.me/917078404837?text=Hi%20Ganesh,%20I%20want%20to%20discuss%20a%20project."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-transparent hover:border-white/10"
                                >
                                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                                        <FaWhatsapp size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-400 text-sm font-medium uppercase">WhatsApp</h4>
                                        <p className="text-white font-semibold text-lg group-hover:text-green-400 transition-colors">Chat on WhatsApp</p>
                                    </div>
                                </a>

                                {/* 4. LOCATION (Click to Maps) */}
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=New+Delhi,India"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-transparent hover:border-white/10"
                                >
                                    <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-400 text-sm font-medium uppercase">Location</h4>
                                        <p className="text-white font-semibold text-lg group-hover:text-pink-400 transition-colors">New Delhi, India</p>
                                    </div>
                                </a>

                            </div>
                        </div>

                        {/* Bottom Quote */}
                        <div className="mt-10 pt-6 border-t border-white/10">
                            <p className="text-gray-500 text-sm italic">
                                "Available for Freelance Projects & Corporate Training."
                            </p>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: FORM --- */}
                    <div className="p-10 md:p-12 bg-black/20">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* ALERTS */}
                            {status === 'success' && (
                                <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-xl flex items-center gap-3 animate-fadeIn">
                                    <FaCheckCircle /> Message Sent Successfully!
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl flex items-center gap-3 animate-fadeIn">
                                    <FaExclamationCircle /> Failed to send message.
                                </div>
                            )}

                            {/* INPUTS - Modern Glass Style */}
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Message</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all resize-none"
                                    placeholder="How can I help you?"
                                ></textarea>
                            </div>

                            {/* SUBMIT BUTTON */}
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Form;