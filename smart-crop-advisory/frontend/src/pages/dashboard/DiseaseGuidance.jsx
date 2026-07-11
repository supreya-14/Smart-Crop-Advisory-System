import { useEffect, useState } from "react";
import { Bug } from "lucide-react";
import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdvisoryCard from "../../components/AdvisoryCard";

const DiseaseGuidance = () => {
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState("");

  const [cropName, setCropName] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const [loadingFarms, setLoadingFarms] = useState(true);
  const [generating, setGenerating] = useState(false);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await api.get("/farms");
        setFarms(res.data);

        if (res.data.length > 0) {
          setSelectedFarm(res.data[0]._id);
        }
      } catch (err) {
        console.error("Failed to fetch farms:", err);
      } finally {
        setLoadingFarms(false);
      }
    };

    fetchFarms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setGenerating(true);
    setResult(null);

    try {
      const res = await api.post("/advisory/disease-guidance", {
        farmId: selectedFarm,
        cropName,
        symptoms,
      });

      setResult(res.data.advisory);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to generate guidance. Please try again."
      );
    } finally {
      setGenerating(false);
    }
  };

  if (loadingFarms) {
    return <LoadingSpinner text="Loading your farms..." />;
  }

  return (
    <div>
      <PageHeader
        title="Disease Detection Guidance"
        subtitle="Describe what you observe on your crop to get AI guidance"
      />

      {farms.length === 0 ? (
        <div className="app-card p-10 text-center text-gray-500 dark:text-gray-400">
          Please add a farm first before requesting disease guidance.
        </div>
      ) : (
        <>
          <div className="app-card p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Select Farm
                </label>

                <select
                  value={selectedFarm}
                  onChange={(e) => setSelectedFarm(e.target.value)}
                  className="input-field"
                >
                  {farms.map((farm) => (
                    <option key={farm._id} value={farm._id}>
                      {farm.farmName} ({farm.location.city})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Crop Name
                </label>

                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  placeholder="e.g. Tomato, Rice, Cotton"
                  className="input-field"
                />
              </div>
                            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Describe the Symptoms
                </label>

                <textarea
                  required
                  rows={4}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g. Yellow spots on leaves, wilting from the bottom up, white powder on leaf surface..."
                  className="input-field resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={generating}
                className="btn-primary flex items-center gap-2"
              >
                <Bug className="w-4 h-4" />
                {generating ? "Analyzing symptoms..." : "Get Guidance"}
              </button>
            </form>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl mt-4">
                {error}
              </div>
            )}
          </div>

          {generating && (
            <LoadingSpinner text="AI is analyzing the symptoms..." />
          )}

          {result && (
            <>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs px-4 py-3 rounded-xl mb-4">
                Note: This is general AI guidance, not a certain diagnosis.
                Please consult your local agriculture officer if symptoms are
                severe or persist.
              </div>

              <AdvisoryCard advisory={result} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DiseaseGuidance;
