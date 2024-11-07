// Hooks
import React, { useState, useEffect } from "react";

// Axios
import axios from "axios";

// XLSX
import * as XLSX from "xlsx";

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
  const api = "http://localhost:3333";
  /* https://geo-backend-aspq.onrender.com */

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
  }, []);

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api}/events/create`, newEvent);
      setNewEvent({ title: "", date: "", location: "", description: "" });
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
      <h1>AdminPage</h1>
      <h2>Criar Evento</h2>
      <form onSubmit={handleEventSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={newEvent.title}
          onChange={handleEventChange}
          required
        />
        <input
          type="datetime-local"
          name="date"
          value={newEvent.date}
          onChange={handleEventChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Localização"
          value={newEvent.location}
          onChange={handleEventChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descrição"
          value={newEvent.description}
          onChange={handleEventChange}></textarea>
        <button type="submit">Criar Evento</button>
      </form>
      <h2>Eventos</h2>
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
                <button onClick={() => exportToExcel(event._id)}>
                  Exportar Usuários
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
