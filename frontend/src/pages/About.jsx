import React from 'react';
import { FaLaptopCode, FaChalkboardTeacher, FaUserGraduate, FaDownload, FaCoffee, FaGamepad, FaLightbulb, FaUniversity } from 'react-icons/fa';
import AboutHeroSection from '../components/About/AboutHeroSection';
import MyMission from '../components/About/MyMission';
import Education from '../components/About/Education';
import LifeBeyondCode from '../components/About/LifeBeyondCode';
import Testimonials from '../components/Testimonial'


const About = () => {


    return (
        <div className="bg-gray-900 min-h-screen pt-24 pb-20 relative overflow-hidden">

            {/* --- BACKGROUND ELEMENTS --- */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>

            <div className="max-w-6xl mx-auto px-6">

                <AboutHeroSection />
                <MyMission />
                <Education />
                <Testimonials />

                <LifeBeyondCode />









            </div>
        </div>


    );
};

export default About;