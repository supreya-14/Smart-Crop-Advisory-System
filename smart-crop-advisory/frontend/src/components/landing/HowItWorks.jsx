import { UserPlus, Tractor, Sparkles } from "lucide-react";

// Simple 3-step "How it works" section.
const steps = [
  {
    icon: UserPlus,
    title: "1. Create Your Account",
    desc: "Sign up as a farmer in seconds and set up your profile.",
  },
  {
    icon: Tractor,
    title: "2. Add Your Farm Details",
    desc: "Enter your soil type, location, and land size to personalize advice.",
  },
  {
    icon: Sparkles,
    title: "3. Get AI-Powered Advisory",
    desc: "Receive instant crop, weather, and disease guidance powered by AI.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-primary-50/50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            How It Works
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Getting expert farming advice has never been this simple.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map(({ icon: Icon, title, desc }, index) => (
            <div key={title} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-16 h-16 mx-auto rounded-2xl gradient-hero flex items-center justify-center mb-5 shadow-lg">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
