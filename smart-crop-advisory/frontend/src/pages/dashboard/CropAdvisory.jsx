import { useEffect, useState } from "react";
import { Sprout } from "lucide-react";
import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdvisoryCard from "../../components/AdvisoryCard";

const SEASONS = ["Kharif", "Rabi", "Zaid", "Current Season"];

// This page lets a farmer pick one of their farms + a season,
// and get an AI-generated crop recommendation.
const CropAdvisory = () => {
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState("");
  const [season, setSeason] = useState("Current Season");
  const [loadingFarms, setLoadingFarms] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await api.get("/farms");
        setFarms(res.data);
        if (res.data.length > 0) setSelectedFarm(res.data[0]._id);
      } catch (err) {
        console.error("Failed to fetch farms:", err);
      } finally {
        setLoadingFarms(false);
      }
    };
    fetchFarms();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");
    setGenerating(true);
    setResult(null);
    try {
      const res = await api.post("/advisory/crop-recommendation", {
        farmId: selectedFarm,
        season,
      });
      setResult(res.data.advisory);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate recommendation. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  if (loadingFarms) return <LoadingSpinner text="Loading your farms..." />;

  return (
    <div>
      <PageHeader title="AI Crop Advisory" subtitle="Get crop recommendations based on your farm's soil, season, and location" />

      {farms.length === 0 ? (
        <div className="app-card p-10 text-center text-gray-500 dark:text-gray-400">
          Please add a farm first before requesting crop advisory.
        </div>
      ) : (
        <>
          <div className="app-card p-6 mb-8">
            <form onSubmit={handleGenerate} className="grid sm:grid-cols-3 gap-4 items-end">
              <div className="sm:col-span-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Select Farm</label>
                <select value={selectedFarm} onChange={(e) => setSelectedFarm(e.target.value)} className="input-field">
                  {farms.map((farm) => (
                    <option key={farm._id} value={farm._id}>
                      {farm.farmName} ({farm.location.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Season</label>
                <select value={season} onChange={(e) => setSeason(e.target.value)} className="input-field">
                  {SEASONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-1">
                <button type="submit" disabled={generating} className="btn-primary w-full flex items-center justify-center gap-2">
                  <Sprout className="w-4 h-4" />
                  {generating ? "Generating..." : "Get Recommendation"}
                </button>
              </div>
            </form>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl mt-4">
                {error}
              </div>
            )}
          </div>

          {generating && <LoadingSpinner text="AI is analyzing your farm details..." />}

          {result && <AdvisoryCard advisory={result} />}
        </>
      )}
    </div>
  );
};

export default CropAdvisory;
