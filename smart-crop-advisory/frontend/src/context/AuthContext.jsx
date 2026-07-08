import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

// This context stores the currently logged-in user and auth functions.
// Any component can access it using the useAuth() hook below.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // When the app first loads, check if we already have a saved token + user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Registers a new user and logs them in immediately
  const register = async (formData) => {
    const response = await api.post("/auth/register", formData);
    saveSession(response.data.token, response.data.user);
    return response.data;
  };

  // Logs in an existing user
  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    saveSession(response.data.token, response.data.user);
    return response.data;
  };

  // Saves the token and user info to both state and localStorage
  const saveSession = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logs out the current user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Updates the stored user info (e.g. after editing profile)
  const updateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access auth state/functions from any component
export const useAuth = () => useContext(AuthContext);
