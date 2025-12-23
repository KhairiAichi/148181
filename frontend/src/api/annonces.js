const API_BASE = "http://localhost:3000/api/v1";

function getToken() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");
  return token;
}

async function handleResponse(res) {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error ${res.status}`);
  }
  return res.json();
}

export const getAnnonces = async () => {
  const res = await fetch(`${API_BASE}/annonces`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return handleResponse(res);
};

export const createAnnonce = async (annonce) => {
  const res = await fetch(`${API_BASE}/annonces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(annonce),
  });
  return handleResponse(res);
};

export const deleteAnnonce = async (id) => {
  const res = await fetch(`${API_BASE}/annonces/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return handleResponse(res);
};

export const updateAnnonce = async (id, annonce) => {
  const res = await fetch(`${API_BASE}/annonces/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(annonce),
  });
  return handleResponse(res);
};
