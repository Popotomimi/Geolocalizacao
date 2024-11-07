// Hooks
import React, { useState, useEffect } from "react";

// Axios
import axios from "axios";

// XLSX
import * as XLSX from "xlsx";

// Toastfy
import { toast } from "react-toastify";

// Icons
import { IoMdDownload } from "react-icons/io";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [selectedEventId, setSelectedEventId] = useState("");
  const api = "https://geo-backend-aspq.onrender.com";
  /* http://localhost:3333 */

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${api}/users/getall`);
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get(`${api}/events/getall`);
        setEvents(response.data.events);
      } catch (error) {
        console.log(error);
      }
    };
    getEvents();
  }, [events]);

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(`${api}/events/create`, newEvent);
      setNewEvent({ title: "", date: "", location: "", description: "" });
      toast.success(resp.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserRegistration = async (userData) => {
    try {
      await axios.post(`${api}/users/register`, {
        ...userData,
        eventId: selectedEventId,
      });
      // Atualizar a lista de usuários ou fazer outra ação
    } catch (error) {
      console.log(error);
    }
  };

  const exportToExcel = async (eventId) => {
    try {
      const response = await axios.get(`${api}/users/getbyevent/${eventId}`);
      const worksheet = XLSX.utils.json_to_sheet(response.data.users);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
      XLSX.writeFile(workbook, `users_data_event_${eventId}.xlsx`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Criar Evento</h1>
      <form onSubmit={handleEventSubmit}>
        <div className="form-container">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={newEvent.title}
            onChange={handleEventChange}
            required
          />
        </div>
        <div className="form-container">
          <input
            type="datetime-local"
            name="date"
            value={newEvent.date}
            onChange={handleEventChange}
            required
          />
        </div>
        <div className="form-container">
          <input
            type="text"
            name="location"
            placeholder="Localização"
            value={newEvent.location}
            onChange={handleEventChange}
            required
          />
        </div>
        <div className="form-container">
          <textarea
            name="description"
            placeholder="Descrição"
            value={newEvent.description}
            onChange={handleEventChange}></textarea>
        </div>
        <button type="submit">Criar Evento</button>
      </form>
      <h1>Eventos</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Data</th>
            <th>Localização</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{new Date(event.date).toLocaleString()}</td>
              <td>{event.location}</td>
              <td>{event.description}</td>
              <td>
                <button
                  title="Exportar Usuários"
                  onClick={() => exportToExcel(event._id)}>
                  <IoMdDownload />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
