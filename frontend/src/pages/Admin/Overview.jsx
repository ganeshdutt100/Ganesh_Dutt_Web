import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaProjectDiagram, FaEnvelope, FaCode, FaServer, FaTools, FaEye, FaLaptopCode } from 'react-icons/fa';

const Overview = () => {
    const [stats, setStats] = useState({
        projects: 0,
        messages: 0,
        skills: { total: 0, frontend: 0, backend: 0, tools: 0 },
        views: 0
    });
    const [loading, setLoading] = useState(true);

    // --- STATIC COUNTS (Jo Code mein Hardcoded hain) ---
    const staticCounts = {
        frontend: 7,
        backend: 4,
        tools: 4,
        total: 15
    };

    // Backend se data lao
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('https://ganesh-portfolio-api.onrender.com/api/dashboard/stats');
                setStats(res.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // Helper Card Component
    const StatCard = ({ title, count, icon, color, subText }) => (
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg flex items-center justify-between hover:scale-105 transition-transform">
            <div>
                <p className="text-gray-400 text-sm mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-white">
                    {loading ? "..." : count}
                </h3>
                {subText && <p className="text-xs text-gray-500 mt-1">{subText}</p>}
            </div>
            <div className={`p-4 rounded-full ${color} text-white text-xl`}>
                {icon}
            </div>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>

            {/* --- TOP ROW (MAIN STATS) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                {/* 1. Total Projects */}
                <StatCard
                    title="Total Projects"
                    count={stats.projects}
                    icon={<FaProjectDiagram />}
                    color="bg-blue-600"
                />

                {/* 2. TOTAL SKILLS (Database + Static 15) */}
                <StatCard
                    title="Total Skills"
                    count={loading ? "..." : (stats.skills.total + staticCounts.total)}
                    icon={<FaLaptopCode />}
                    color="bg-purple-600"
                    subText={`${staticCounts.total} Static + ${stats.skills.total} Dynamic`}
                />

                {/* 3. Unread Messages */}
                <StatCard
                    title="Unread Messages"
                    count={stats.messages}
                    icon={<FaEnvelope />}
                    color={stats.messages > 0 ? "bg-red-500 animate-pulse" : "bg-gray-600"}
                    subText={stats.messages === 0 ? "All caught up!" : "New inquiries waiting"}
                />

                {/* 4. Views */}
                <StatCard
                    title="Portfolio Views"
                    count={stats.views}
                    icon={<FaEye />}
                    color="bg-green-500"
                />
            </div>

            {/* --- SKILLS BREAKDOWN (Detailed Count) --- */}
            <h3 className="text-xl font-bold text-white mb-4">Skills Category Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                {/* Frontend Skills */}
                <StatCard
                    title="Frontend Skills"
                    // Logic: DB Count + 7 Static
                    count={loading ? "..." : (stats.skills.frontend + staticCounts.frontend)}
                    icon={<FaCode />}
                    color="bg-cyan-600"
                />

                {/* Backend Skills */}
                <StatCard
                    title="Backend Skills"
                    // Logic: DB Count + 4 Static
                    count={loading ? "..." : (stats.skills.backend + staticCounts.backend)}
                    icon={<FaServer />}
                    color="bg-indigo-600"
                />

                {/* Tools */}
                <StatCard
                    title="Tools & DevOps"
                    // Logic: DB Count + 4 Static
                    count={loading ? "..." : (stats.skills.tools + staticCounts.tools)}
                    icon={<FaTools />}
                    color="bg-orange-600"
                />
            </div>
        </div>
    );
};

export default Overview;