// Hooks
import React, { useState, useEffect } from "react";

// Axios
import axios from "axios";

// React router Dom
import { Link } from "react-router-dom";

// XLSX
import * as XLSX from "xlsx";

// React Toastify
import { toast } from "react-toastify";

// Icons
import { IoMdDownload, IoMdTrash } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

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
  const [editableEvent, setEditableEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = "https://geo-backend-aspq.onrender.com";
  /* http://localhost:3333 */

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${api}/events/getall`);
      setEvents(response.data.events);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
    fetchEvents();
  }, []);

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    if (editableEvent) {
      setEditableEvent({ ...editableEvent, [name]: value });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(`${api}/events/create`, newEvent);
      setNewEvent({ title: "", date: "", location: "", description: "" });
      toast.success(resp.data.message);
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEventUpdate = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.put(
        `${api}/events/update/${editableEvent._id}`,
        editableEvent
      );
      setEditableEvent(null);
      toast.success(resp.data.message);
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEventEdit = (event) => {
    setEditableEvent(event);
  };

  const handleEventDelete = async (id) => {
    try {
      const resp = await axios.delete(`${api}/events/delete/${id}`);
      toast.success(resp.data.message);
      fetchEvents();
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
      <h1>{editableEvent ? "Editar Evento" : "Criar Evento"}</h1>
      <form onSubmit={editableEvent ? handleEventUpdate : handleEventSubmit}>
        <div className="form-container">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={editableEvent ? editableEvent.title : newEvent.title}
            onChange={handleEventChange}
            required
          />
        </div>
        <div className="form-container">
          <input
            type="datetime-local"
            name="date"
            value={editableEvent ? editableEvent.date : newEvent.date}
            onChange={handleEventChange}
            required
          />
        </div>
        <div className="form-container">
          <input
            type="text"
            name="location"
            placeholder="Localização"
            value={editableEvent ? editableEvent.location : newEvent.location}
            onChange={handleEventChange}
            required
          />
        </div>
        <div className="form-container">
          <textarea
            name="description"
            placeholder="Descrição"
            value={
              editableEvent ? editableEvent.description : newEvent.description
            }
            onChange={handleEventChange}></textarea>
        </div>
        <button className="btn" type="submit">
          {editableEvent ? "Atualizar Evento" : "Criar Evento"}
        </button>
      </form>
      <h1>Eventos</h1>
      {loading ? (
        <div>
          <h2>Carregando...</h2>
          <iframe
            disabled
            src="https://giphy.com/embed/3oEjI6SIIHBdRxXI40"
            className="loading"></iframe>
        </div>
      ) : (
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
                <td>
                  <Link to={`/event/${event._id}`}>{event.title}</Link>
                </td>
                <td>{new Date(event.date).toLocaleString()}</td>
                <td>{event.location}</td>
                <td>{event.description}</td>
                <td className="actions">
                  <button
                    className="btn-export"
                    title="Exportar Usuários"
                    onClick={() => exportToExcel(event._id)}>
                    <IoMdDownload />
                  </button>
                  <button
                    className="btn-edit"
                    title="Editar Evento"
                    onClick={() => handleEventEdit(event)}>
                    <FaEdit />
                  </button>
                  <button
                    className="btn-delete"
                    title="Deletar Evento"
                    onClick={() => handleEventDelete(event._id)}>
                    <IoMdTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
