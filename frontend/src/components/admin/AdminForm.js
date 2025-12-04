import React from "react";

export default function AdminForm({ form, editingUserId, handleChange, handleSubmit, cancelEdit }) {
  return (
    <>
      <h3>
        {editingUserId ? "Modifier Utilisateur" : "Ajouter Utilisateur"}
      </h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required={!editingUserId}
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="admin">admin</option>
          <option value="developpeur">developpeur</option>
          <option value="testeur">testeur</option>
        </select>

        <button type="submit">
          {editingUserId ? "Mettre à jour" : "Ajouter"}
        </button>

        {editingUserId && (
          <button type="button" onClick={cancelEdit} style={{ marginLeft: 10 }}>
            Annuler
          </button>
        )}
      </form>
    </>
  );
}
