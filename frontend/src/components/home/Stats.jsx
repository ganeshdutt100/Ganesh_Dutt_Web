import React, { useState, useEffect, useRef } from 'react';
import { FaChalkboardTeacher, FaCode, FaInstagram, FaProjectDiagram, FaYoutube } from 'react-icons/fa';

// --- INTELLIGENT COUNTER COMPONENT ---
const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null); // Element ko target karne ke liye
    const [hasStarted, setHasStarted] = useState(false); // Track karega ki animation start hui ya nahi

    // 1. Observer Effect: Check karega ki element screen par aaya ya nahi
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setHasStarted(true); // Screen par aate hi flag true karo
                    observer.disconnect(); // Observer hata do taaki baar-baar restart na ho
                }
            },
            { threshold: 0.5 } // Jab 50% element dikhega tab start hoga
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // 2. Animation Effect: Jab hasStarted true hoga tabhi chalega
    useEffect(() => {
        if (!hasStarted) return; // Agar screen par nahi aaya to kuch mat karo

        let startTime = null;
        const start = 0;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;

            const current = Math.min(Math.floor((progress / duration) * (end - start) + start), end);
            setCount(current);

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, hasStarted]);

    return <span ref={countRef}>{count}</span>;
};

const Stats = () => {
    const statsData = [
        {
            id: 1,
            value: 500,
            suffix: "+",
            label: "Students Trained",
            icon: <FaChalkboardTeacher />,
            description: "Mentoring future devs"
        },
        {
            id: 2,
            value: 20,
            suffix: "+",
            label: "Projects Completed",
            icon: <FaProjectDiagram />,
            description: "Delivering excellence"
        },
        {
            id: 3,
            value: 1000,
            suffix: "+",
            label: "Hours of Coding",
            icon: <FaCode />,
            description: "Turning coffee into code"
        },
        {
            id: 4,
            value: 1200,
            suffix: "+",
            label: "Community Strong",
            icon: <FaInstagram />,
            description: "WebGyaan Hub Family"
        },
    ];

    return (
        <div className="relative w-full py-20 bg-gray-900/50">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-6xl mx-auto px-6" data-aos="zoom-in" data-aos-delay="200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {statsData.map((stat) => (
                        <div
                            key={stat.id}
                            className="group relative bg-gray-800/40 backdrop-blur-md border border-gray-700/50 p-6 rounded-2xl text-center hover:-translate-y-2 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"

                        >
                            {/* Icon Circle */}
                            <div className="w-14 h-14 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center text-2xl text-blue-400 group-hover:scale-110 transition-transform duration-300 border border-gray-700 group-hover:border-blue-500 group-hover:text-blue-300 shadow-inner">
                                {stat.icon}
                            </div>

                            {/* Number with Scroll-Triggered Animation */}
                            <h3 className="text-4xl font-extrabold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center gap-1">
                                <AnimatedCounter end={stat.value} duration={2000} />
                                <span>{stat.suffix}</span>
                            </h3>

                            {/* Label */}
                            <p className="text-white font-semibold text-lg">{stat.label}</p>

                            <p className="text-gray-500 text-xs mt-1 group-hover:text-gray-400 transition-colors">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;