import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const baseUrl = "https://task31-backend-pi.vercel.app";
  const api_version = "api/v1";
  useEffect(() => {
    axios
      .get(`${baseUrl}/${api_version}/auth`, { withCredentials: true })
      .then((res) => {
        if (res.status === 201) {
          setUser(res.data.user);
        } else {
          throw new Error("Unauthorized");
        }
      })
      .catch(() => {
        toast.error("Session expired! Please login again.");
        setUser(null);
      });
    axios
      .get(`${baseUrl}/${api_version}/all_users`, { withCredentials: true })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch(() => {
        toast.error("Failed to fetch users.");
      });
  }, []);

  const handleLogout = () => {
    axios.post(`${baseUrl}/${api_version}/logout`, {}, {
      withCredentials: true
    })
      .then(() => {
        toast.success("Logged out successfully!", { position: "top-right" });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch(() => toast.error("Logout failed!", { position: "top-right" }));

  }

  return (
    <div className="flex h-screen">


      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-white p-4 shadow-md flex justify-between items-center">
          <span className="text-lg font-bold">Dashboard</span>
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Welcome: {user ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : "Guest"}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-100">


          {/* User List */}
          <h2 className="text-xl font-bold mt-6 mb-4">All Users</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  
                  <th className="p-2 border">Sr. No</th>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Username</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Create At</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((usr,index) => (
                    <tr key={usr.id} className="border-t item-center text-center">
                      <td className="p-2 border">{index+1}</td>
                      <td className="p-2 border">{usr._id}</td>
                      <td className="p-2 border">{usr.username}</td>
                      <td className="p-2 border">{usr.email}</td>
                      <td className="p-2 border">
                        {new Intl.DateTimeFormat('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        }).format(new Date(usr.createdAt))}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-2 text-center">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
