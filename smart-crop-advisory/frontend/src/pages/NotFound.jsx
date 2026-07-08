import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

// Simple 404 page shown for any unmatched route.
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gradient-hero text-white px-4 text-center">
      <Leaf className="w-16 h-16 mb-4" />
      <h1 className="text-6xl font-bold mb-2">404</h1>
      <p className="text-lg mb-8">Oops! This page doesn't exist.</p>
      <Link to="/" className="bg-white text-primary-700 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 transition-all">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
