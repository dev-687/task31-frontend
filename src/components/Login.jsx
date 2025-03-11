import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'
function Login() {
const navigate=useNavigate()
const [formData,setFormData]=useState({email:"",password:""});
const baseUrl = "https://task31-backend-pi.vercel.app";
const api_version = "api/v1";


useEffect(() => {
  axios
    .get(`${baseUrl}/${api_version}/auth`, { withCredentials: true ,  headers: {
      "Content-Type": "application/json",
    } })
    .then((res) => {
      console.log("Auth Response", res.data);
      if (res.data.loggedIn) {
        toast.info("You are logged in!", { position: "top-right" });
        navigate("/dashboard");
      }
    })
    .catch((err) => {
      console.log("Not logged in", err);
    });
}, [navigate]);


const handleChange=(e)=>{
    setFormData({ ...formData, [e.target.name]: e.target.value })
}
const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const result=await axios.post(`${baseUrl}/${api_version}/login`,formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        validateStatus: (status) => status < 500,
      })
      if (result.status === 200) {
              toast.success(result.data.message, { position: "top-right" });
              setFormData({ email: "", password: "" });
              setTimeout(() => {
                navigate("/dashboard");
            }, 2000); 
            } else if (result.status === 401 ) {
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
      <button className="text-center justify-center item-center text-blue-500 hover:underline" onClick={() => navigate("/welcome")}>
      <FontAwesomeIcon icon={faHome} title='Welcome' />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
        New User?{" "}
        <button className="text-blue-500 hover:underline" onClick={() => navigate("/register")}>
          Register
        </button>
      </p>
      <ToastContainer />
      </div>
    </div>
  )
}

export default Login
