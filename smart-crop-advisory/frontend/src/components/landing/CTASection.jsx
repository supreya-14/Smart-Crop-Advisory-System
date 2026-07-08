import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Final call-to-action banner before the footer.
const CTASection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="gradient-hero rounded-3xl px-8 py-16 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Grow Smarter?
          </h2>
          <p className="text-primary-50 max-w-xl mx-auto mb-8">
            Join farmers already using AI-powered advisory to make better decisions every season.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl"
          >
            Create Free Account <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
