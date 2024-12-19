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
  const [display, setDisplay] = useState(false);

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

  const handlePay = async () => {
    setDisplay(true);
  };

  return (
    <div className="users-container">
      <h1>Usuários cadastrados no evento:</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nome</th> <th>Check-in</th> <th>Check-out</th> <th>PIX</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td> <td>{user.datetime}</td>
              <td>
                {user.datetimecheckout ? (
                  user.datetimecheckout
                ) : (
                  <IoMdCloseCircleOutline
                    title="Não Realizou o check-out ainda"
                    className="not-pix"
                  />
                )}
              </td>{" "}
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
      <button onClick={handlePay} className="btn">
        Pagar
      </button>
      <div className="pay-container">
        {display &&
          users
            .filter((user) => user.pix)
            .map((user) => (
              <div key={user._id} className="qrcode-card">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user.pix}`}
                  alt={user.name}
                />
                <h3>{user.name}</h3>
              </div>
            ))}
      </div>
    </div>
  );
};

export default EventDetail;
