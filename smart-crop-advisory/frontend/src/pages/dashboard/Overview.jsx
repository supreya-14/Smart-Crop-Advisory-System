import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tractor, History, Sprout, MessageCircle } from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import PageHeader from "../../components/PageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";

// The main dashboard landing page - shows a quick summary and shortcuts.
const Overview = () => {
  const { user } = useAuth();
  const [farmCount, setFarmCount] = useState(0);
  const [advisoryCount, setAdvisoryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Fetch farms and advisory history in parallel to save time
        const [farmsRes, advisoryRes] = await Promise.all([
          api.get("/farms"),
          api.get("/advisory/history"),
        ]);
        setFarmCount(farmsRes.data.length);
        setAdvisoryCount(advisoryRes.data.length);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const shortcuts = [
    { to: "/dashboard/farms", label: "Manage Farms", icon: Tractor, color: "bg-primary-50 text-primary-600 dark:bg-primary-900/30" },
    { to: "/dashboard/advisory", label: "Get Crop Advisory", icon: Sprout, color: "bg-earth-100 text-earth-600 dark:bg-earth-500/20" },
    { to: "/dashboard/chatbot", label: "Ask AI Chatbot", icon: MessageCircle, color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30" },
    { to: "/dashboard/history", label: "View History", icon: History, color: "bg-purple-50 text-purple-600 dark:bg-purple-900/30" },
  ];

  if (loading) return <LoadingSpinner text="Loading your dashboard..." />;

  return (
    <div>
      <PageHeader title={`Welcome back, ${user?.name || "Farmer"} 👋`} subtitle="Here's a quick look at your farming activity" />

      {/* Quick stats */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="app-card p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Farms Added</p>
          <p className="text-3xl font-bold text-primary-600 mt-2">{farmCount}</p>
        </div>
        <div className="app-card p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Advisories Generated</p>
          <p className="text-3xl font-bold text-primary-600 mt-2">{advisoryCount}</p>
        </div>
      </div>

      {/* Quick shortcuts */}
      <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {shortcuts.map(({ to, label, icon: Icon, color }) => (
          <Link key={to} to={to} className="app-card p-5 flex flex-col items-start gap-3 hover:-translate-y-1">
            <div className={`p-3 rounded-xl ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="font-medium text-sm text-gray-700 dark:text-gray-200">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Overview;
