// A simple reusable header used at the top of every dashboard page.
const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
