import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Sprout,
  CloudSun,
  Bug,
  MessageCircle,
  History,
  User,
  Tractor,
} from "lucide-react";

// Sidebar navigation used inside the dashboard layout.
const links = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/farms", label: "My Farms", icon: Tractor },
  { to: "/dashboard/advisory", label: "Crop Advisory", icon: Sprout },
  { to: "/dashboard/weather", label: "Weather Advisory", icon: CloudSun },
  { to: "/dashboard/disease", label: "Disease Guidance", icon: Bug },
  { to: "/dashboard/chatbot", label: "AI Chatbot", icon: MessageCircle },
  { to: "/dashboard/history", label: "Advisory History", icon: History },
  { to: "/dashboard/profile", label: "Profile", icon: User },
];

const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 md:min-h-[calc(100vh-4rem)] p-4">
      <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
