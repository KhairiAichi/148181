import React, { useState, useEffect } from "react";
import ProtectedRoute from "../ProtectedRoute";
import {
  getAnnonces,
  createAnnonce,
  deleteAnnonce,
  updateAnnonce,
} from "../../api/annonces";
import styles from "./AdminAnnonces.module.css";

export default function AdminAnnonces() {
  const [annonces, setAnnonces] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [roleTarget, setRoleTarget] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // قراءة token مباشرة من localStorage
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
      const res = await getAnnonces(); // لا حاجة لتمرير token
      const data = Array.isArray(res) ? res : res.annonces || [];
      setAnnonces(data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des annonces. Veuillez réessayer.");
      setAnnonces([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      setError("Veuillez remplir tous les champs.");  
      return;
    }
    if (!token) {
      setError("Session expirée. Veuillez vous reconnecter.");
      return;
    }

    const annonceData = {
      title,
      content,
      target_role: roleTarget,
      // ✅ لا ترسل created_by، backend يأخذه من JWT
    };
    console.log('aaaaa');

    setError("");
    try {
      if (editingId) {
        await updateAnnonce(editingId, annonceData); // لا حاجة لتمرير token
      } else {
        await createAnnonce(annonceData); // لا حاجة لتمرير token
      }
      setTitle("");
      setContent("");
      setRoleTarget("all");
      setEditingId(null);
      fetchAnnonces();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'envoi de l'annonce. Vérifiez votre connexion ou vos droits.");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await deleteAnnonce(id); // لا حاجة لتمرير token
      fetchAnnonces();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression de l'annonce.");
    }
  };

  const handleEdit = (annonce) => {
    setTitle(annonce.title);
    setContent(annonce.content);
    setRoleTarget(annonce.target_role);
    setEditingId(annonce.id);
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className={styles.container}>
        <h2>Admin Annonces</h2>

        <div className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}

          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Contenu"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <select
            value={roleTarget}
            onChange={(e) => setRoleTarget(e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="developpeur">Développeurs</option>
            <option value="testeur">Testeurs</option>
          </select>
          <button onClick={handleSubmit}>
            {editingId ? "Modifier" : "Ajouter"}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setContent("");
                setRoleTarget("all");
              }}
            >
              Annuler
            </button>
          )}
        </div>

        <div className={styles.list}>
          {loading ? (
            <p>Chargement...</p>
          ) : annonces.length === 0 ? (
            <p>Aucune annonce disponible.</p>
          ) : (
            annonces.map((a) => (
               <div key={a.id} className={styles.annonce}>
               <h3>{a.title}</h3>
               <p>{a.content}</p>
               <p className={styles.role}>Pour: {a.target_role}</p>
               <p className={styles.info}>
                Créé par: {a.created_by_name || "Admin"} | Le: {new Date(a.created_at).toLocaleString()}
               </p>
            <button onClick={() => handleEdit(a)}>Modifier</button>
            <button onClick={() => handleDelete(a.id)}>Supprimer</button>
           </div>
   ))

          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
