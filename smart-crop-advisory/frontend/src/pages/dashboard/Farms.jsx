import { useEffect, useState } from "react";
import { Plus, MapPin, Layers, Ruler, Trash2, X } from "lucide-react";
import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";

const SOIL_TYPES = ["Alluvial", "Black", "Red", "Laterite", "Sandy", "Clay", "Loamy"];

// This page lets farmers add new farms and view/delete their existing farms.
const Farms = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    farmName: "",
    city: "",
    state: "",
    soilType: "Loamy",
    landSizeValue: "",
    landSizeUnit: "acres",
  });

  // Fetch all farms belonging to the logged-in user
  const fetchFarms = async () => {
    try {
      const res = await api.get("/farms");
      setFarms(res.data);
    } catch (err) {
      console.error("Failed to fetch farms:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.post("/farms", formData);
      setShowForm(false);
      setFormData({ farmName: "", city: "", state: "", soilType: "Loamy", landSizeValue: "", landSizeUnit: "acres" });
      fetchFarms(); // refresh the list after adding
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add farm. Please check the details.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this farm?")) return;
    try {
      await api.delete(`/farms/${id}`);
      setFarms(farms.filter((farm) => farm._id !== id));
    } catch (err) {
      console.error("Failed to delete farm:", err);
    }
  };

  if (loading) return <LoadingSpinner text="Loading your farms..." />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="My Farms" subtitle="Manage your farm details for accurate AI advisory" />
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Farm"}
        </button>
      </div>

      {/* Add Farm Form */}
      {showForm && (
        <div className="app-card p-6 mb-8 animate-slide-up">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Add New Farm</h3>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Farm Name</label>
              <input
                type="text"
                name="farmName"
                required
                value={formData.farmName}
                onChange={handleChange}
                placeholder="e.g. Green Valley Farm"
                className="input-field"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Soil Type</label>
              <select name="soilType" value={formData.soilType} onChange={handleChange} className="input-field">
                {SOIL_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">City</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Coimbatore"
                className="input-field"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">State</label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. Tamil Nadu"
                className="input-field"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Land Size</label>
              <input
                type="number"
                name="landSizeValue"
                required
                min="0"
                step="0.1"
                value={formData.landSizeValue}
                onChange={handleChange}
                placeholder="e.g. 5"
                className="input-field"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Unit</label>
              <select name="landSizeUnit" value={formData.landSizeUnit} onChange={handleChange} className="input-field">
                <option value="acres">Acres</option>
                <option value="hectares">Hectares</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
                {submitting ? "Saving..." : "Save Farm"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Farms list */}
      {farms.length === 0 ? (
        <div className="app-card p-10 text-center text-gray-500 dark:text-gray-400">
          You haven't added any farms yet. Click "Add Farm" to get started.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {farms.map((farm) => (
            <div key={farm._id} className="app-card p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-800 dark:text-white">{farm.farmName}</h3>
                <button
                  onClick={() => handleDelete(farm._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Delete farm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {farm.location.city}, {farm.location.state}
                </p>
                <p className="flex items-center gap-2">
                  <Layers className="w-4 h-4" /> {farm.soilType} Soil
                </p>
                <p className="flex items-center gap-2">
                  <Ruler className="w-4 h-4" /> {farm.landSize.value} {farm.landSize.unit}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Farms;
