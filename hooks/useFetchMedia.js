import { useState, useEffect } from "react";
import axios from "axios";

const useFetchMedia = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(
          "http://16.171.35.48/media/fetchMedia",
          { withCredentials: true }
        );
        setMedia(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  return { media };
};

export default useFetchMedia;
