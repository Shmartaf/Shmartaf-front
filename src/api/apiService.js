import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

const getAll = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { getAll };
