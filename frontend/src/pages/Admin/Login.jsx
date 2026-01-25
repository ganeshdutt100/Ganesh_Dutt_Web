import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Icons import kiye

const Login = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Eye toggle state
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // BACKEND CALL 📡
            const res = await axios.post('https://ganesh-portfolio-api.onrender.com/api/auth/login', { password });

            // Agar success hua to token save karo
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate("/admin");
            }
        } catch (err) {
            // Error handling ko thoda behtar banaya
            const msg = err.response?.data?.message || "❌ Login Failed! Server check karo.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl w-96">

                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                        <FaLock />
                    </div>
                    <h2 className="text-2xl font-bold">Admin Login</h2>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} // Type change hoga
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 pr-10 text-white focus:outline-none focus:border-blue-500 text-center tracking-wider"
                        />

                        {/* --- EYE ICON BUTTON --- */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>

                    {error && <p className="text-red-400 text-center text-sm bg-red-900/20 p-2 rounded border border-red-500/50">{error}</p>}

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {loading ? "Checking..." : "Unlock Dashboard 🔓"}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Login;