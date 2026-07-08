import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

// Public pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Dashboard pages
import Overview from "./pages/dashboard/Overview";
import Farms from "./pages/dashboard/Farms";
import CropAdvisory from "./pages/dashboard/CropAdvisory";
import WeatherAdvisory from "./pages/dashboard/WeatherAdvisory";
import DiseaseGuidance from "./pages/dashboard/DiseaseGuidance";
import Chatbot from "./pages/dashboard/Chatbot";
import AdvisoryHistory from "./pages/dashboard/AdvisoryHistory";
import Profile from "./pages/dashboard/Profile";

// This is the root component that defines all the routes/pages in our app.
function App() {
  return (
    // Wrap everything with our global context providers
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* ----- Public Routes ----- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ----- Protected Dashboard Routes -----
              All routes under /dashboard require login, and share the DashboardLayout (Navbar + Sidebar) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="farms" element={<Farms />} />
            <Route path="advisory" element={<CropAdvisory />} />
            <Route path="weather" element={<WeatherAdvisory />} />
            <Route path="disease" element={<DiseaseGuidance />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="history" element={<AdvisoryHistory />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* ----- 404 fallback ----- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
