'use client'
import { useRouter } from "next/navigation";
import Join from "../../components/localComponents/Join";
import  axios  from "axios";
const JoinPage = () => {
  const router = useRouter();
  const handleJoin = async (userData) => {
    console.log(userData);
    try {
      // Make an HTTP POST request to the server
      const response = await axios.post("http://localhost:8000/auth/register", userData);

      // Handle the response
      if (response.status === 201) {
        // If joining is successful, redirect the user to the chat page or another page
        console.log("Joining successful!", response.data.message);
        router.push('/login');
      } else {
        // If joining fails, display an error message to the user
        console.error("Joining failed:", response.data.message);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("An error occurred:", error);
    }
  };
  return <Join handleJoin = {handleJoin} />;
};

export default JoinPage;
