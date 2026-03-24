import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";

// components
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";

// Admin
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 🔥 NEW: Layout Wrapper to handle conditional Navbar/Footer
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  
  // Check if the current path is an admin-related page
  const isAdminPage = location.pathname.startsWith("/dashboard") || location.pathname === "/admin";

  return (
    <>
      {/* Only show Navbar if NOT an admin page */}
      {!isAdminPage && <Navbar />}

      <main className={isAdminPage ? "min-h-screen" : "min-h-screen pt-28 md:pt-36 lg:pt-38"}>
        {children}
      </main>

      {/* Only show Footer if NOT an admin page */}
      {!isAdminPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <LayoutWrapper>
        <Routes>
          {/* 🌐 PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/contact" element={<Contact />} />

          {/* 🔐 ADMIN ROUTES */}
          <Route path="/admin" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
