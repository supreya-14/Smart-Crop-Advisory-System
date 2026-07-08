// A simple, reusable loading spinner used whenever we wait for API/AI responses.
const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
