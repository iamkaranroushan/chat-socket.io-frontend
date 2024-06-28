import { useState, useEffect } from "react";
import axios from "axios";

const useSenderId = () => {
  const [sender, setSender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSenderId = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/getUsername", {
          withCredentials: true
        });
        const user = response.data;
        setSender(user);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSenderId();
  }, []);

  return { sender, loading, error };
};

export default useSenderId;