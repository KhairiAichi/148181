import React from "react";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";

export default function AdminTable({ users, onEdit, onDelete }) {
  return (
    <table border="1" style={{ margin: "0 auto", padding: 10 }}>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>
              <span onClick={() => onEdit(u)}>
                <EditIcon />
              </span>

              <span onClick={() => onDelete(u.id)} style={{ marginLeft: 10 }}>
                <DeleteIcon />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
