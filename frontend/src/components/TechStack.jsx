import React, { useState, useEffect } from "react";
import axios from "axios";

// --- ICONS IMPORT ---
import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub
} from "react-icons/fa";
import {
    SiNextdotjs, SiBootstrap, SiTailwindcss, SiJavascript, SiMongodb, SiExpress, SiPostman, SiVercel, SiRedux, SiFirebase, SiNetlify
} from "react-icons/si";

const TechStack = () => {
    const [dbSkills, setDbSkills] = useState([]); // Database wale skills
    const [loading, setLoading] = useState(true);

    // --- 1. HARDCODED SKILLS (STATIC) ---
    // Note: 'category' field wahi hona chahiye jo Admin Panel mein hai (Frontend, Backend, Tools)
    const staticSkills = [
        // FRONTEND
        { name: "React.js", category: "Frontend", icon: <FaReact />, color: "text-cyan-400", bg: "group-hover:bg-cyan-400/20" },
        { name: "Next.js", category: "Frontend", icon: <SiNextdotjs />, color: "text-white", bg: "group-hover:bg-white/20" },
        { name: "Tailwind", category: "Frontend", icon: <SiTailwindcss />, color: "text-cyan-300", bg: "group-hover:bg-cyan-300/20" },
        { name: "JavaScript", category: "Frontend", icon: <SiJavascript />, color: "text-yellow-400", bg: "group-hover:bg-yellow-400/20" },
        { name: "Redux", category: "Frontend", icon: <SiRedux />, color: "text-purple-500", bg: "group-hover:bg-purple-500/20" },
        { name: "HTML5", category: "Frontend", icon: <FaHtml5 />, color: "text-orange-500", bg: "group-hover:bg-orange-500/20" },
        { name: "CSS3", category: "Frontend", icon: <FaCss3Alt />, color: "text-blue-500", bg: "group-hover:bg-blue-500/20" },

        // BACKEND
        { name: "Node.js", category: "Backend", icon: <FaNodeJs />, color: "text-green-500", bg: "group-hover:bg-green-500/20" },
        { name: "Express", category: "Backend", icon: <SiExpress />, color: "text-gray-300", bg: "group-hover:bg-gray-300/20" },
        { name: "MongoDB", category: "Backend", icon: <SiMongodb />, color: "text-green-400", bg: "group-hover:bg-green-400/20" },
        { name: "Firebase", category: "Backend", icon: <SiFirebase />, color: "text-yellow-500", bg: "group-hover:bg-yellow-500/20" },

        // TOOLS
        { name: "Git", category: "Tools", icon: <FaGitAlt />, color: "text-red-500", bg: "group-hover:bg-red-500/20" },
        { name: "GitHub", category: "Tools", icon: <FaGithub />, color: "text-white", bg: "group-hover:bg-white/20" },
        { name: "Postman", category: "Tools", icon: <SiPostman />, color: "text-orange-400", bg: "group-hover:bg-orange-400/20" },
        { name: "Vercel", category: "Tools", icon: <SiVercel />, color: "text-white", bg: "group-hover:bg-white/20" },
    ];

    // --- 2. FETCH DYNAMIC SKILLS FROM DB ---
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get("https://ganesh-portfolio-api.onrender.com/api/skills");
                setDbSkills(res.data);
            } catch (error) {
                console.error("Error fetching skills:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    // --- HELPER TO RENDER CATEGORY ---
    const renderCategory = (title, categoryKey) => {

        // 1. Static walo ko filter karo
        const localSkills = staticSkills.filter(s => s.category === categoryKey);

        // 2. Database walo ko filter karo
        const remoteSkills = dbSkills.filter(s => s.category === categoryKey);

        // 3. MERGE KARO (Pehle Static, Fir Database wale)
        const allSkills = [...localSkills, ...remoteSkills];

        if (allSkills.length === 0) return null;

        return (
            <div className="mb-16" data-aos="fade-up">
                {/* Category Title */}
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-2xl font-bold text-gray-200">{title}</h3>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-800 to-transparent"></div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {allSkills.map((skill, index) => (
                        <div
                            key={index} // DB id ya Index use kar rahe hain merging ki wajah se
                            className="group relative p-[2px] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 h-40"
                        >
                            {/* Animated Border */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 animate-spin-slow"
                                style={{ animationDuration: '3s' }}>
                            </div>

                            {/* Card Content */}
                            <div className="relative bg-gray-800 h-full rounded-xl p-4 flex flex-col items-center justify-center gap-3 border border-gray-700 group-hover:border-transparent transition-all z-10">

                                {/* Glow Effect */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-opacity duration-500 ${skill.bg || 'bg-blue-500'}`}></div>

                                {/* --- LOGIC: AGAR IMAGE HAI TO IMAGE DIKHAO, WARNA ICON --- */}
                                <div className={`text-5xl z-10 transition-transform duration-300 group-hover:scale-110 ${skill.color || 'text-gray-400'}`}>
                                    {skill.image ? (
                                        // DATABASE SKILL (Image)
                                        <div className="w-16 h-16">
                                            <img
                                                src={`https://ganesh-portfolio-api.onrender.com/uploads/${skill.image}`}
                                                alt={skill.name}
                                                className="w-full h-full object-contain filter rounded-full group-hover:grayscale-0 transition-all duration-300"
                                                onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=IMG" }}
                                            />
                                        </div>
                                    ) : (
                                        // STATIC SKILL (Icon)
                                        skill.icon
                                    )}
                                </div>

                                {/* Name */}
                                <h3 className="text-gray-400 font-semibold group-hover:text-white transition-colors z-10 text-sm">
                                    {skill.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (loading) return <div className="py-20 bg-gray-900 text-center text-gray-400">Loading Tech Stack...</div>;

    return (
        <div className="relative py-20 bg-gray-900">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-down">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                        My Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Stack</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Mastering the tools that build the modern web.
                    </p>
                </div>

                {/* --- RENDER SECTIONS --- */}
                {/* Note: Second parameter wahi hona chahiye jo DB mein aur Static list mein 'category' hai */}

                {renderCategory("Frontend Development", "Frontend")}

                {renderCategory("Backend & Database", "Backend")}

                {renderCategory("DevOps & Tools", "Tools")}

            </div>
        </div>
    );
};

export default TechStack;