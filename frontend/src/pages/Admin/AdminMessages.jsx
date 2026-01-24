import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEnvelope, FaUser, FaClock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- FETCH MESSAGES ---
    const fetchMessages = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/messages');
            setMessages(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching messages:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // --- DELETE MESSAGE ---
    const handleDelete = async (id) => {
        if (window.confirm("Delete this message?")) {
            try {
                await axios.delete(`http://localhost:5000/api/messages/${id}`);
                toast.success("Message Deleted!");
                // UI se hatane ke liye filter use kar rahe hain (API call bachane ke liye)
                setMessages(messages.filter(msg => msg._id !== id));
            } catch (error) {
                toast.error("Failed to delete");
            }
        }
    };

    // --- DATE FORMATTER ---
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (loading) return <div className="text-white text-center mt-10">Loading Messages...</div>;

    return (
        <div>
            <ToastContainer theme="dark" position="top-right" />

            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaEnvelope className="text-blue-500" /> Inbox
                <span className="text-sm bg-gray-800 text-gray-400 px-3 py-1 rounded-full border border-gray-700">
                    {messages.length}
                </span>
            </h2>

            {messages.length === 0 ? (
                <div className="text-gray-500 text-center py-20 bg-gray-800/50 rounded-xl border border-gray-700">
                    No new messages 📭
                </div>
            ) : (
                <div className="grid gap-4">
                    {messages.map((msg) => (
                        <div key={msg._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all group relative">

                            {/* Delete Button (Top Right) */}
                            <button
                                onClick={() => handleDelete(msg._id)}
                                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                title="Delete Message"
                            >
                                <FaTrash />
                            </button>

                            {/* Header: Name & Time */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center">
                                        <FaUser />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{msg.name}</h3>
                                        <a href={`mailto:${msg.email}`} className="text-sm text-blue-400 hover:underline">
                                            {msg.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-900 px-3 py-1 rounded-full w-fit">
                                    <FaClock /> {formatDate(msg.createdAt)}
                                </div>
                            </div>

                            {/* Message Body */}
                            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 text-gray-300 leading-relaxed text-sm">
                                {msg.message}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminMessages;