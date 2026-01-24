import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    FaPlus, FaList, FaEnvelope, FaSignOutAlt,
    FaKey, FaLaptopCode, FaHome, FaCog, FaBriefcase, FaCommentAlt
} from 'react-icons/fa';

// --- COMPONENTS IMPORTS ---
import ManageProjects from './ManageProjects';
import AddProject from './AddProject';
import AdminMessages from './AdminMessages';
import ChangePassword from './ChangePassword';
import ManageSkills from './ManageSkills';
import Overview from './Overview';
import Settings from './Settings';
import ManageExperience from './ManageExperience';
import ManageTestimonials from './ManageTestimonials'; // 👈 NEW IMPORT

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [totalMessages, setTotalMessages] = useState(0);
    const navigate = useNavigate();

    // --- 1. DYNAMIC SIDEBAR STATE ---
    const [adminProfile, setAdminProfile] = useState({
        adminName: 'Ganesh',
        adminTitle: 'Admin Panel',
        adminLogo: null
    });

    // --- 2. LAST READ MESSAGE COUNT ---
    const [lastReadCount, setLastReadCount] = useState(() => {
        return parseInt(localStorage.getItem('lastReadCount')) || 0;
    });

    // --- FETCH DATA (MESSAGES + PROFILE) ---
    useEffect(() => {
        // Fetch Messages
        const fetchMessageData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/messages');
                setTotalMessages(res.data.length);
            } catch (error) {
                console.error("Error fetching messages", error);
            }
        };

        // Fetch Profile (For Sidebar Logo & Name)
        const fetchProfileData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/profile');
                if (res.data) {
                    setAdminProfile({
                        adminName: res.data.adminName || 'Ganesh',
                        adminTitle: res.data.adminTitle || 'Admin Panel',
                        adminLogo: res.data.adminLogo
                    });
                }
            } catch (error) {
                console.error("Error fetching profile", error);
            }
        };

        fetchMessageData();
        fetchProfileData();

        // Real-time Message Update (Every 10 sec)
        const interval = setInterval(fetchMessageData, 10000);
        return () => clearInterval(interval);
    }, []);

    // --- HANDLE TABS ---
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // Clear Badge if Messages Tab Opened
        if (tab === 'messages') {
            setLastReadCount(totalMessages);
            localStorage.setItem('lastReadCount', totalMessages);
        }
    };

    // Calculate Unread Badge
    const unreadCount = totalMessages - lastReadCount;

    // --- LOGOUT ---
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    // Helper Class for Buttons
    const getButtonClass = (tabName) => {
        const baseClass = "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer";
        const activeClass = "bg-blue-600 text-white shadow-lg shadow-blue-500/30";
        const inactiveClass = "text-gray-400 hover:bg-gray-700 hover:text-white";

        return `${baseClass} ${activeTab === tabName ? activeClass : inactiveClass}`;
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden pt-20">

            {/* --- SIDEBAR --- */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col shadow-2xl z-20">

                {/* DYNAMIC HEADER */}
                <div className="p-6 border-b border-gray-700 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white overflow-hidden shadow-md">
                        {adminProfile.adminLogo ? (
                            <img
                                src={`http://localhost:5000/uploads/${adminProfile.adminLogo}`}
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-xl">{adminProfile.adminName.substring(0, 2).toUpperCase()}</span>
                        )}
                    </div>
                    <div className="overflow-hidden">
                        <h2 className="font-bold text-base truncate">{adminProfile.adminTitle}</h2>
                        <p className="text-xs text-gray-400 truncate">Welcome, {adminProfile.adminName}</p>
                    </div>
                </div>

                {/* NAVIGATION */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">

                    {/* Overview */}
                    <button onClick={() => handleTabChange('overview')} className={getButtonClass('overview')}>
                        <FaHome /> Overview
                    </button>

                    {/* Projects Section */}
                    <div className="pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider pl-4">Projects</div>
                    <button onClick={() => handleTabChange('projects')} className={getButtonClass('projects')}>
                        <FaList /> All Projects
                    </button>
                    <button onClick={() => handleTabChange('add-project')} className={getButtonClass('add-project')}>
                        <FaPlus /> Add New Project
                    </button>

                    {/* Features Section */}
                    <div className="pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider pl-4">Features</div>

                    <button onClick={() => handleTabChange('skills')} className={getButtonClass('skills')}>
                        <FaLaptopCode /> Manage Skills
                    </button>

                    <button onClick={() => handleTabChange('experience')} className={getButtonClass('experience')}>
                        <FaBriefcase /> Experience
                    </button>

                    {/* 👇 TESTIMONIALS BUTTON ADDED HERE */}
                    <button onClick={() => handleTabChange('testimonials')} className={getButtonClass('testimonials')}>
                        <FaCommentAlt /> Testimonials
                    </button>

                    {/* Messages (With Badge) */}
                    <button
                        onClick={() => handleTabChange('messages')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'messages' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                    >
                        <div className="flex items-center gap-3">
                            <FaEnvelope /> Messages
                        </div>
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse shadow-red-500/50 shadow-sm">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Settings Section */}
                    <div className="pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider pl-4">Settings</div>

                    <button onClick={() => handleTabChange('settings')} className={getButtonClass('settings')}>
                        <FaCog /> General Settings
                    </button>

                    <button onClick={() => handleTabChange('password')} className={getButtonClass('password')}>
                        <FaKey /> Change Password
                    </button>
                </nav>

                {/* LOGOUT BUTTON */}
                <div className="p-4 border-t border-gray-700 bg-gray-850">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all font-semibold"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 overflow-y-auto bg-gray-900 relative">
                {/* Background Glow Effect */}
                <div className="fixed top-0 left-64 w-full h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative z-10 p-8 max-w-7xl mx-auto">
                    {activeTab === 'overview' && <Overview />}

                    {/* Projects */}
                    {activeTab === 'projects' && <ManageProjects />}
                    {activeTab === 'add-project' && <AddProject />}

                    {/* Features */}
                    {activeTab === 'skills' && <ManageSkills />}
                    {activeTab === 'experience' && <ManageExperience />}
                    {activeTab === 'testimonials' && <ManageTestimonials />}  {/* 👈 TESTIMONIALS RENDER */}

                    {/* Messages & Settings */}
                    {activeTab === 'messages' && <AdminMessages />}
                    {activeTab === 'settings' && <Settings />}
                    {activeTab === 'password' && <ChangePassword />}
                </div>
            </main>

        </div>
    );
};

export default AdminDashboard;