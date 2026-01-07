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
  const [roleTarget, setRoleTarget] = useState("all"); // all / role / specific
  const [targetRole, setTargetRole] = useState("developpeur"); // si roleTarget = role
  const [targetEmail, setTargetEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

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
      setAnnonces(data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des annonces.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      setError("Veuillez remplir le titre et le contenu.");
      return;
    }
    if (roleTarget === "specific" && !targetEmail) {
      setError("Veuillez saisir l'email de l'utilisateur.");
      return;
    }

    const annonceData = {
  title,
  content,
  target_role:
    roleTarget === "role" ? targetRole : roleTarget === "all" ? "all" : null ,
  target_email:
    roleTarget === "specific" ? targetEmail : null,
};


    try {
      if (editingId) {
        await updateAnnonce(editingId, annonceData);
      } else {
        await createAnnonce(annonceData);
      }

      setTitle("");
      setContent("");
      setRoleTarget("all");
      setTargetRole("developpeur");
      setTargetEmail("");
      setEditingId(null);
      fetchAnnonces();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'envoi de l'annonce.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnnonce(id);
      fetchAnnonces();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression.");
    }
  };

  const handleEdit = (annonce) => {
    setTitle(annonce.title);
    setContent(annonce.content);
    setEditingId(annonce.id);

    if (annonce.target_user_name) {
      setRoleTarget("specific");
      setTargetEmail(annonce.target_user_email || "");
    } else if (annonce.target_role && annonce.target_role !== "all") {
      setRoleTarget("role");
      setTargetRole(annonce.target_role);
    } else {
      setRoleTarget("all");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className={styles.container}>
        <h2>Admin Annonces</h2>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.form}>
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
            <option value="role">Par rôle</option>
            <option value="specific">Utilisateur spécifique</option>
          </select>

          {roleTarget === "role" && (
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            >
              <option value="developpeur">Développeurs</option>
              <option value="testeur">Testeurs</option>
            </select>
          )}

          {roleTarget === "specific" && (
            <input
              type="email"
              placeholder="Email de l'utilisateur"
              value={targetEmail}
              onChange={(e) => setTargetEmail(e.target.value)}
            />
          )}

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
                setTargetRole("developpeur");
                setTargetEmail("");
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
                <p className={styles.role}>
                  Pour: {a.target_user_email ? a.target_user_email : a.target_role==='all' ? 'Tous' : a.target_role}

                </p>
                <p>
                  Créé par: {a.created_by_name || "Admin"} |{" "}
                  {new Date(a.created_at).toLocaleString()}
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
