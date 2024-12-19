// userController.js
import { useEffect, useState } from "react";
import { fetchUsers } from "./userModel";

export const useUserController = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const userData = await fetchUsers();
      setUsers(userData);
      setLoading(false);
    };

    getUsers();
  }, []);

  return { users, loading };
};
