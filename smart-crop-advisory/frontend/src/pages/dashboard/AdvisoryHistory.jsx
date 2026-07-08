import { useEffect, useState } from "react";
import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdvisoryCard from "../../components/AdvisoryCard";

// This page shows a list of all past AI advisories the user has generated.
const AdvisoryHistory = () => {
  const [advisories, setAdvisories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/advisory/history");
        setAdvisories(res.data);
      } catch (err) {
        console.error("Failed to fetch advisory history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Filter advisories by type based on the selected tab
  const filteredAdvisories =
    filter === "all" ? advisories : advisories.filter((a) => a.type === filter);

  const tabs = [
    { key: "all", label: "All" },
    { key: "crop-recommendation", label: "Crop Recommendations" },
    { key: "weather-advisory", label: "Weather Advisories" },
    { key: "disease-guidance", label: "Disease Guidance" },
  ];

  if (loading) return <LoadingSpinner text="Loading your advisory history..." />;

  return (
    <div>
      <PageHeader title="Advisory History" subtitle="All your past AI-generated recommendations in one place" />

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === tab.key
                ? "bg-primary-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredAdvisories.length === 0 ? (
        <div className="app-card p-10 text-center text-gray-500 dark:text-gray-400">
          No advisories found in this category yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {filteredAdvisories.map((advisory) => (
            <AdvisoryCard key={advisory._id} advisory={advisory} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvisoryHistory;
