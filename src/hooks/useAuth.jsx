import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// Configuração do axios
const api = axios.create({
  baseURL: "https://geo-backend-aspq.onrender.com",
});

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user) {
    try {
      const data = await api.post("/auth/register", user).then((response) => {
        return response.data;
      });
      await authUser(data);
      toast.success("Você está autenticado!");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro desconhecido. Tente novamente mais tarde.");
      }
    }
  }

  async function login(user) {
    try {
      const data = await api.post("/auth/login", user).then((response) => {
        return response.data;
      });

      await authUser(data);
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function authUser(data) {
    setAuthenticated(true);

    localStorage.setItem("token", data.token);
    api.defaults.headers.Authorization = `Bearer ${data.token}`;

    navigate("/");
  }

  function logout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;

    toast.warn("Logout realizado com sucesso!");

    navigate("/");
  }

  return { authenticated, register, logout, login };
}
