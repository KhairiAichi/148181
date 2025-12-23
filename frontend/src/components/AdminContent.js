import React from "react";
import { useHistory } from '@docusaurus/router';
import { useUsers } from "../hooks/useUsers";
import AdminForm from "./admin/AdminForm";
import AdminTable from "./admin/AdminTable";
import AdminSearch from "./admin/AdminSearch";
import { usersAPI } from "../api/users";

export default function AdminContent() {

  const history = useHistory(); // 👈  

  const { users, setUsers, error, setError } = useUsers();

  const [form, setForm] = React.useState({ name: "", email: "", password: "", role: "developpeur" });
  const [editingUserId, setEditingUserId] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingUserId) {
        const payload = { ...form };
        if (!payload.password) delete payload.password;

        await usersAPI.update(editingUserId, payload);

        setUsers(users.map(u => (u.id === editingUserId ? { ...u, ...form } : u)));
      } else {
        const res = await usersAPI.create(form);
        setUsers([...users, { ...form, id: res.userId }]);
      }

      setForm({ name: "", email: "", password: "", role: "developpeur" });
      setEditingUserId(null);
      setError("");
    } catch (err) {
      setError("Erreur lors de l'action");
    }
  };

  const deleteUser = async id => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    await usersAPI.delete(id);
    setUsers(users.filter(u => u.id !== id));
  };

  const editUser = u => {
    setEditingUserId(u.id);
    setForm({ name: u.name, email: u.email, password: "", role: u.role });
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", marginTop: 30 }}>
      <h2>Bienvenue Admin</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        style={{ marginBottom: 20 }}
        onClick={() => history.push('/admin/annonces')}
      >
        Voir les Annonces
      </button>

      <AdminSearch search={search} setSearch={setSearch} />

      <AdminForm
        form={form}
        editingUserId={editingUserId}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelEdit={() => {
          setEditingUserId(null);
          setForm({ name: "", email: "", password: "", role: "developpeur" });
        }}
      />

      <AdminTable users={filteredUsers} onEdit={editUser} onDelete={deleteUser} />
    </div>
  );
}
