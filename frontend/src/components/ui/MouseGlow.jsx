import React, { useEffect, useState } from "react";

const MouseGlow = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHoveringImage, setIsHoveringImage] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // --- SMART CHECK ---
            // Check karo ki mouse kis element ke upar hai
            const target = e.target;

            // Agar wo element 'IMG' (Image) hai, toh state update karo
            if (target.tagName === "IMG") {
                setIsHoveringImage(true);
            } else {
                setIsHoveringImage(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return (
        <div
            className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ease-in-out"
            style={{
                // Agar Image par hover hai (isHoveringImage true hai), toh Opacity 0 kar do (Glow Gayab)
                // Warna Opacity 1 rakho (Glow Dikhao)
                opacity: isHoveringImage ? 0 : 1,

                background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.25), transparent 80%)`,
            }}
        />
    );
};

export default MouseGlow;