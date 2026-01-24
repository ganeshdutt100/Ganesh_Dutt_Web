import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check karo ki token hai ya nahi
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
        // Agar token nahi hai, to Login par bhej do
        return <Navigate to="/login" replace />;
    }

    // Agar token hai, to jo page maanga tha wo dikha do (AdminDashboard)
    return children;
};

export default ProtectedRoute;