import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/users";

const getToken = () => localStorage.getItem("token");

export const usersAPI = {
  getAll: async () => {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  },

  update: async (id, data) => {
    return axios.put(`${API_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  delete: async (id) => {
    return axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
