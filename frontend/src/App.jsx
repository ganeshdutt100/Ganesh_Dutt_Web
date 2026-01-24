import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Preloader from './components/ui/Preloader';
import Navbar from './components/layout/Navbar';
import ChatBot from './components/ui/ChatBot'; // <--- Import Kiya
import MouseGlow from "./components/ui/MouseGlow";
import Footer from './components/layout/Footer';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedRoute from "./components/ProtectedRoute"; // <--- Import 1
import Login from "./pages/Admin/Login";



// --- 1. AOS IMPORTS ---
import AOS from 'aos';
import 'aos/dist/aos.css'; // CSS file 

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

import GaneshResume from './pages/GaneshResume';
import NotFound from './pages/NotFound';



function App() {
  const location = useLocation();

  // Logic: Agar URL '/admin' hai to Navbar/Footer mat dikhao
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // --- 2. INITIALIZE ANIMATION aos ---
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation (1 second)
      once: true,     // Animation 
      easing: 'ease-out-cubic', // Smooth effect
    });
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="bg-gray-900 min-h-screen text-white relative">
          <MouseGlow />
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/resume" element={<GaneshResume />} />
            {/* <Route path="/admin" element={<AdminDashboard />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>


          <ChatBot />
          {!isAdminRoute && <Footer />}
        </div>
      )}
    </>
  );
}

export default App;