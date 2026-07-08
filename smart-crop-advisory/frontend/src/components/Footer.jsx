import { Leaf } from "lucide-react";

// Simple footer shown at the bottom of the landing page.
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 font-bold text-lg text-white">
          <Leaf className="w-6 h-6 text-primary-400" />
          AgriAdvisor
        </div>
        <p className="text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} AgriAdvisor. Empowering farmers with AI-driven insights.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
