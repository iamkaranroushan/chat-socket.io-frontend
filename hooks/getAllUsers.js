import { useState, useEffect } from 'react';
import axios from 'axios';

const useAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/getAllUsers",{
          withCredentials: true
        });
        setUsers(response.data); // Assuming the response contains an array of users
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
};

export default useAllUsers;
