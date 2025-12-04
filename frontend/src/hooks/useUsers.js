import { useState, useEffect } from "react";
import { usersAPI } from "../api/users";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await usersAPI.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Erreur de chargement");
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return { users, setUsers, error, setError, fetchUsers };
}
