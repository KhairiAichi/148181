import React, { useState, useEffect } from "react";
import { getAnnonces } from "../api/annonces";
import styles from "./UserAnnonces.module.css";

export default function UserAnnonces() {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!token) {
      setError("Session expirée. Veuillez vous reconnecter.");
      return;
    }
    fetchAnnonces();
  }, []);

  const fetchAnnonces = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAnnonces();
      const data = Array.isArray(res) ? res : res.annonces || [];

      const filtered = data.filter(
        (a) => a.target_role === "all" || a.target_role === user.role
      );

      setAnnonces(filtered);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des annonces.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Mes Annonces</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : annonces.length === 0 ? (
        <p>Aucune annonce disponible.</p>
      ) : (
        annonces.map((a) => (
          <div key={a.id} className={styles.annonce}>
            <h3>{a.title}</h3>
            <p>{a.content}</p>
            <p className={styles.role}>Pour: {a.target_role}</p>
            <p className={styles.info}>
              Créé par: {a.created_by_name || "Admin"} | Le:{" "}
              {new Date(a.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
