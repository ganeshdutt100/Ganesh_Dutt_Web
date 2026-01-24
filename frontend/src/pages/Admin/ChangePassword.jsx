import React, { useState } from 'react';
import axios from 'axios';
import { FaKey, FaCheckCircle, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Eye Toggle States
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // <--- Loading State Add Kiya

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🔵 Button Clicked! Function Started..."); // Debug Log

        setMessage(null);
        setError(null);
        setLoading(true); // Loading Start

        try {
            console.log("📡 Sending Request to Backend...");
            // Backend API call
            const res = await axios.post('http://localhost:5000/api/auth/change-password', {
                oldPassword,
                newPassword
            });

            console.log("✅ Success:", res.data);
            setMessage("✅ " + res.data.message);
            setOldPassword('');
            setNewPassword('');
        } catch (err) {
            console.error("❌ Error:", err);
            setError("❌ " + (err.response?.data?.message || "Server Error (Check Console)"));
        } finally {
            setLoading(false); // Loading Stop (Chahe success ho ya fail)
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl">

            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaKey className="text-yellow-500" /> Change Password
            </h2>

            {message && <div className="bg-green-900/50 text-green-400 p-3 rounded mb-4 border border-green-500/50">{message}</div>}
            {error && <div className="bg-red-900/50 text-red-400 p-3 rounded mb-4 border border-red-500/50">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* --- CURRENT PASSWORD --- */}
                <div>
                    <label className="block text-gray-400 text-sm mb-2">Current Password</label>
                    <div className="relative">
                        <input
                            type={showOldPass ? "text" : "password"}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 pr-10 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                            placeholder="Enter current password"
                            required
                        />
                        <button
                            type="button" // Ye zaroori hai taaki ye form submit na kare
                            onClick={() => setShowOldPass(!showOldPass)}
                            className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
                        >
                            {showOldPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>
                </div>

                {/* --- NEW PASSWORD --- */}
                <div>
                    <label className="block text-gray-400 text-sm mb-2">New Password</label>
                    <div className="relative">
                        <input
                            type={showNewPass ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 pr-10 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                            placeholder="Enter new password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPass(!showNewPass)}
                            className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
                        >
                            {showNewPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>
                </div>

                {/* --- SUBMIT BUTTON --- */}
                <button
                    type="submit" // Explicitly bata diya ki ye submit button hai
                    disabled={loading} // Jab loading ho to button disable kar do
                    className={`w-full font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${loading
                            ? 'bg-yellow-800 text-gray-400 cursor-not-allowed'
                            : 'bg-yellow-600 hover:bg-yellow-500 text-white'
                        }`}
                >
                    {loading ? (
                        <>Updating... <FaSpinner className="animate-spin" /></>
                    ) : (
                        <>Update Password <FaCheckCircle /></>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;