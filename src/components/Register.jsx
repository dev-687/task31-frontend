import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate=useNavigate(null)
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const baseUrl = "https://task31-backend-sandy.vercel.app/";
  const api_version = "api/v1";
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${baseUrl}/${api_version}/register`, formData, {
        withCredentials: true,
        validateStatus: (status) => status < 500,
      });
      if (result.status === 201) {
        setFormData({ username: "", email: "", password: "" });
        toast.success(result.data.message, { position: "top-right" });
        setTimeout(() => {
          navigate("/");
      }, 2000);
        

      } else if (result.status === 301) {
        toast.warning(result.data.message, { position: "top-right" });
      }
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
      console.log('Error: ', error);

    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <button className="text-blue-500 hover:underline" onClick={() => navigate("/welcome")}>
          <FontAwesomeIcon icon={faHome} title='Welcome' />
        </button>
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="username" className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300" required 
          value={formData.username}
          onChange={handleChange}
        />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300" required
          value={formData.email}
          onChange={handleChange}
           />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300" required 
          value={formData.password}
          onChange={handleChange}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Register
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <button className="text-blue-500 hover:underline" onClick={() => navigate("/login")}>
          Login
        </button>
      </p>
      <ToastContainer />
    </div>
    </div>
  )
}

export default Register
