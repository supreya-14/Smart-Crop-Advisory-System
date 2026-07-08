import { Sprout, CloudSun, Bug, Calendar } from "lucide-react";

// Maps advisory "type" to an icon and color so cards look visually distinct.
const typeStyles = {
  "crop-recommendation": { icon: Sprout, color: "text-primary-600 bg-primary-50 dark:bg-primary-900/30" },
  "weather-advisory": { icon: CloudSun, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/30" },
  "disease-guidance": { icon: Bug, color: "text-red-600 bg-red-50 dark:bg-red-900/30" },
};

// A reusable card that displays one AI advisory result (used in history + result pages).
const AdvisoryCard = ({ advisory }) => {
  const style = typeStyles[advisory.type] || typeStyles["crop-recommendation"];
  const Icon = style.icon;

  return (
    <div className="app-card p-6 animate-slide-up">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${style.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">{advisory.cropName}</h3>
            <p className="text-xs text-gray-400 capitalize">{advisory.type.replace("-", " ")}</p>
          </div>
        </div>
        {advisory.createdAt && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(advisory.createdAt).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Preserve line breaks from the AI response using whitespace-pre-line */}
      <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
        {advisory.recommendation}
      </p>
    </div>
  );
};

export default AdvisoryCard;
