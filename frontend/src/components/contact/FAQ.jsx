import React, { useState } from 'react';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {
    // --- STATE ---
    const [openFaq, setOpenFaq] = useState(null);

    // --- TOGGLE LOGIC ---
    const toggleFaq = (index) => {
        // Agar same click kiya to band karo, warna naya kholo
        setOpenFaq(openFaq === index ? null : index);
    };

    // --- DATA ---
    const faqData = [
        {
            question: "Do you provide online training?",
            answer: "Yes! I provide 100% live interactive sessions via Google Meet or Zoom. You also get recorded sessions for revision."
        },
        {
            question: "How much do you charge for a freelance project?",
            answer: "It depends on the complexity and scope of the project. I usually work on a milestone basis. Let's hop on a call to discuss your requirements."
        },
        {
            question: "Do you offer placement assistance?",
            answer: "Yes, for my 'Full Stack Masterclass' students, I provide resume reviews, mock interviews, and refer your profile to my network of HRs."
        },
        {
            question: "Can I hire you for a small bug fix?",
            answer: "Absolutely! I offer hourly consultation services for debugging, code review, and performance optimization."
        },
        {
            question: "What is your preferred Tech Stack?",
            answer: "I specialize in the MERN Stack (MongoDB, Express, React, Node.js) along with Next.js, Redux, and Tailwind CSS."
        }
    ];

    return (
        <div className="relative bg-gray-900 py-24 px-6 overflow-hidden">

            {/* --- BACKGROUND GLOWS --- */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black -z-20"></div>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-4xl mx-auto relative z-10" data-aos="fade-up">

                {/* --- HEADER --- */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        <FaQuestionCircle className="text-blue-500" />
                        Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Questions</span>
                    </h3>
                    <p className="text-gray-400">Got questions? We've got answers.</p>
                </div>

                {/* --- ACCORDION LIST --- */}
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className={`group border rounded-2xl overflow-hidden transition-all duration-500 ${openFaq === index
                                ? 'bg-white/10 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]'
                                : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                                }`}
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                            >
                                <span className={`font-semibold text-lg transition-colors duration-300 ${openFaq === index ? 'text-blue-400' : 'text-gray-200 group-hover:text-white'}`}>
                                    {faq.question}
                                </span>

                                {/* Animated Arrow */}
                                <div className={`p-2 rounded-full bg-white/5 transition-all duration-300 ${openFaq === index ? 'rotate-180 bg-blue-500/20 text-blue-400' : 'text-gray-400 group-hover:text-white'}`}>
                                    <FaChevronDown />
                                </div>
                            </button>

                            {/* Answer Content with Smooth Height Transition */}
                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Text */}
                <div className="text-center mt-12 text-gray-500 text-sm">
                    Can't find what you're looking for? <a href="#contact" className="text-blue-400 hover:underline">Message me directly.</a>
                </div>

            </div>
        </div>
    );
};

export default FAQ;