"use client";
import { useRouter } from "next/navigation";
import Login from "../../components/localComponents/Login.jsx"; 
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const handleLogin = async (userData) => {
    console.log(userData);
    try {
      // Make an HTTP POST request to the server
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        userData,
        { withCredentials: true }
      );
      // Handle the response
      if (response.status === 200) {
        // If login is successful, redirect the user to the dashboard or another page
        console.log("Login successful!", response.data);
        router.push('/')
      } else {
        // If login fails, display an error message to the user
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("An error occurred:", error.message);
    }
  };
  return <Login handleLogin={handleLogin} />;
};

export default LoginPage;
