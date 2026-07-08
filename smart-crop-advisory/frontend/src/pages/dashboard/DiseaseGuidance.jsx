import { useState } from "react";
import { Bug } from "lucide-react";
import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdvisoryCard from "../../components/AdvisoryCard";

// This page lets farmers describe crop symptoms in plain text
// and get AI-generated disease guidance (not a certain diagnosis).
const DiseaseGuidance = () => {
  const [cropName, setCropName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setGenerating(true);
    setResult(null);
    try {
      const res = await api.post("/advisory/disease-guidance", { cropName, symptoms });
      setResult(res.data.advisory);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate guidance. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <PageHeader title="Disease Detection Guidance" subtitle="Describe what you observe on your crop to get AI guidance" />

      <div className="app-card p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Crop Name</label>
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

          <button type="submit" disabled={generating} className="btn-primary flex items-center gap-2">
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

      {generating && <LoadingSpinner text="AI is analyzing the symptoms..." />}

      {result && (
        <>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs px-4 py-3 rounded-xl mb-4">
            Note: This is general AI guidance, not a certain diagnosis. Please consult your local agriculture
            officer if symptoms are severe or persist.
          </div>
          <AdvisoryCard advisory={result} />
        </>
      )}
    </div>
  );
};

export default DiseaseGuidance;
