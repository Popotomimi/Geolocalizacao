// Hooks
import React, { useEffect, useState } from "react";

// React Router Dom
import { useParams } from "react-router-dom";

// Axios
import axios from "axios";

// Icons
import { IoMdCloseCircleOutline } from "react-icons/io";

const EventDetail = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const api = "https://geo-backend-aspq.onrender.com";

  useEffect(() => {
    const searchId = async () => {
      try {
        const response = await axios.get(`${api}/users/getbyevent/${id}`);
        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          console.log(
            "A resposta da API não contém um array de usuários:",
            response.data
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    searchId();
  }, [id]);

  return (
    <div className="users-container">
      <h1>Usuários cadastrados no evento:</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nome</th> <th>Telefone</th> <th>Localização</th> <th>PIX</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td> <td>{user.phone}</td>
              <td>{user.location}</td>{" "}
              <td>
                {user.pix ? (
                  user.pix
                ) : (
                  <IoMdCloseCircleOutline
                    title="Não cadastrou o pix ainda"
                    className="not-pix"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventDetail;
