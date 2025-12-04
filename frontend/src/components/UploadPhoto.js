import React, { useState } from 'react';
import axios from 'axios';

export default function UploadPhoto({ user, setUser }) {
  const [photo, setPhoto] = useState(null);
  const token = localStorage.getItem('jwt');

  const handlePhotoChange = e => setPhoto(e.target.files[0]);

  const handlePhotoUpload = async () => {
    if (!photo) return;
    const formData = new FormData();
    formData.append('photo', photo);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/users/${user.id}/photo`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        }
      );

      const updatedUser = { ...user, photo_url: res.data.photo.photo_url };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setPhoto(null);
      alert("Photo mise à jour ✅");
    } catch (err) {
      console.error(err);
      alert("Erreur lors du téléchargement de la photo");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <input type="file" onChange={handlePhotoChange} />
      <button onClick={handlePhotoUpload} disabled={!photo} style={{ marginLeft: 10 }}>
        Upload
      </button>
    </div>
  );
}
