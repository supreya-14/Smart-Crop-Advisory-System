import { Sprout, CloudSun, Bug, MessageCircle, History, ShieldCheck } from "lucide-react";

// List of feature cards shown on the landing page.
const features = [
  {
    icon: Sprout,
    title: "AI Crop Recommendation",
    desc: "Get personalized crop suggestions based on your soil type, season, and location.",
  },
  {
    icon: CloudSun,
    title: "Weather-Based Advisory",
    desc: "Real-time irrigation, pest risk, and fertilizer timing advice based on live weather data.",
  },
  {
    icon: Bug,
    title: "Disease Detection Guidance",
    desc: "Describe crop symptoms and get instant AI guidance on likely causes and remedies.",
  },
  {
    icon: MessageCircle,
    title: "24/7 AI Chatbot",
    desc: "Ask any farming question anytime — fertilizers, diseases, irrigation, and more.",
  },
  {
    icon: History,
    title: "Advisory History",
    desc: "Access all your past recommendations and advisories in one organized place.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    desc: "Your farm data is protected with secure authentication and encrypted passwords.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Everything a Modern Farmer Needs
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            One platform combining AI intelligence with real farming data to help you grow better.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, index) => (
            <div
              key={title}
              className="app-card p-7 animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
