import { useState, useEffect } from "react";
import io from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("/api/getToken");
        if (response.ok) {
          const token = await response.json();
          console.log(token);
          setAuthToken(token);
        } else {
          console.log("no token");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchToken();
  }, []);
  useEffect(() => {
    if(authToken){
      const newSocket = io("http://localhost:8000", {
        auth: {
          token: authToken,
        },
      }); 
      setSocket(newSocket);
  
       // Disconnect the socket when component unmounts
      
    }
  }, [authToken]);

  return socket;
};
export default useSocket;
