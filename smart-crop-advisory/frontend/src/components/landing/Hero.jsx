import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

// The big hero/banner section at the top of the landing page.
const Hero = () => {
  return (
    <section className="gradient-hero text-white relative overflow-hidden">
      {/* Decorative blurred circles for a modern SaaS feel */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-300 rounded-full blur-3xl opacity-20 -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-earth-300 rounded-full blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          Powered by Google Gemini AI
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto animate-slide-up">
          Smarter Farming Starts with <span className="text-primary-200">Smart Advisory</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-primary-50 max-w-2xl mx-auto animate-slide-up">
          Get AI-powered crop recommendations, weather-based advisories, and instant disease
          guidance — all tailored to your farm's soil, season, and location.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Link
            to="/register"
            className="bg-white text-primary-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            Start Free Today <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/login"
            className="border-2 border-white/70 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center"
          >
            I Already Have an Account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
