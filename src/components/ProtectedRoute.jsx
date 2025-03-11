import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const baseUrl = "https://task31-backend-pi.vercel.app/";
  const api_version = "api/v1";
  useEffect(() => {
    axios
      .get(`${baseUrl}/${api_version}/auth`, { withCredentials: true })
      .then((res) => {
        if (res.status === 201 && res.data.loggedIn) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Unauthorized");
        }
      })
      .catch(() => {
        toast.error("Protected URL! Please Login!", { position: "top-right" });
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>; // Prevents flicker

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
