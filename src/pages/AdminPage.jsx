// Hooks
import React, { useState, useEffect } from "react";

// Axios
import axios from "axios";

// XLSX
import * as XLSX from "xlsx";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3333/users/getall");
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users_data.xlsx");
  };

  return (
    <div className="admin-page">
      <h1>AdminPage</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Localização</th>
            <th>Data e horário</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.location}</td>
              <td>{user.datetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={exportToExcel}>Exportar para Excel</button>
    </div>
  );
};

export default AdminPage;
