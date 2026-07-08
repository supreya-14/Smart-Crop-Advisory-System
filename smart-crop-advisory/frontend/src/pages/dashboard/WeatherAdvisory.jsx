import { useEffect, useState } from "react";
import { CloudSun, Droplets, Wind, Thermometer } from "lucide-react";
import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdvisoryCard from "../../components/AdvisoryCard";

// This page fetches live weather data for a farm's location and gets
// AI advice on irrigation, pest risk, and fertilizer timing.
const WeatherAdvisory = () => {
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState("");
  const [cropName, setCropName] = useState("");
  const [loadingFarms, setLoadingFarms] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [weather, setWeather] = useState(null);
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
    setWeather(null);
    try {
      const res = await api.post("/advisory/weather-advisory", {
        farmId: selectedFarm,
        cropName,
      });
      setResult(res.data.advisory);
      setWeather(res.data.weather);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate weather advisory. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  if (loadingFarms) return <LoadingSpinner text="Loading your farms..." />;

  return (
    <div>
      <PageHeader title="Weather-Based Advisory" subtitle="Get irrigation, pest, and fertilizer advice based on live weather" />

      {farms.length === 0 ? (
        <div className="app-card p-10 text-center text-gray-500 dark:text-gray-400">
          Please add a farm first before requesting weather advisory.
        </div>
      ) : (
        <>
          <div className="app-card p-6 mb-8">
            <form onSubmit={handleGenerate} className="grid sm:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Select Farm</label>
                <select value={selectedFarm} onChange={(e) => setSelectedFarm(e.target.value)} className="input-field">
                  {farms.map((farm) => (
                    <option key={farm._id} value={farm._id}>
                      {farm.farmName} ({farm.location.city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Crop Name</label>
                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  placeholder="e.g. Rice, Wheat, Cotton"
                  className="input-field"
                />
              </div>

              <button type="submit" disabled={generating} className="btn-primary w-full flex items-center justify-center gap-2">
                <CloudSun className="w-4 h-4" />
                {generating ? "Checking..." : "Get Weather Advisory"}
              </button>
            </form>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl mt-4">
                {error}
              </div>
            )}
          </div>

          {generating && <LoadingSpinner text="Fetching weather data and generating advice..." />}

          {weather && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="app-card p-4 text-center">
                <Thermometer className="w-5 h-5 mx-auto text-orange-500 mb-2" />
                <p className="text-xs text-gray-400">Temperature</p>
                <p className="font-semibold text-gray-800 dark:text-white">{weather.temperature}°C</p>
              </div>
              <div className="app-card p-4 text-center">
                <Droplets className="w-5 h-5 mx-auto text-blue-500 mb-2" />
                <p className="text-xs text-gray-400">Humidity</p>
                <p className="font-semibold text-gray-800 dark:text-white">{weather.humidity}%</p>
              </div>
              <div className="app-card p-4 text-center">
                <Wind className="w-5 h-5 mx-auto text-gray-500 mb-2" />
                <p className="text-xs text-gray-400">Wind Speed</p>
                <p className="font-semibold text-gray-800 dark:text-white">{weather.windSpeed} m/s</p>
              </div>
              <div className="app-card p-4 text-center">
                <CloudSun className="w-5 h-5 mx-auto text-yellow-500 mb-2" />
                <p className="text-xs text-gray-400">Condition</p>
                <p className="font-semibold text-gray-800 dark:text-white capitalize">{weather.description}</p>
              </div>
            </div>
          )}

          {result && <AdvisoryCard advisory={result} />}
        </>
      )}
    </div>
  );
};

export default WeatherAdvisory;
