import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { QRCodeSVG } from "qrcode.react";

const EventDetail = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const api = "https://geo-backend-aspq.onrender.com";
  const [display, setDisplay] = useState(false);
  let cidade = "SAO PAULO";

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

  const removeSpecialCharsAndUppercase = (str) => {
    return str
      .normalize("NFD")
      .replace(/[^a-zA-Z0-9\s\u0300-\u036f]/g, "")
      .toUpperCase();
  };

  const truncateString = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) : str;
  };

  const generatePixCode = (user) => {
    const pix = removeSpecialCharsAndUppercase(user.pix);
    let name = removeSpecialCharsAndUppercase(user.name);
    name = truncateString(name, 25);

    const payload = `00020126420014br.gov.bcb.pix0111${pix}0205Teste5204000053039865802BR5925${name}6009${cidade}62290525a67e0HyNJlAGyQiu1FkPeekCG63043A2C`;
    return payload;
  };

  return (
    <div className="users-container">
      <h1>Usuários cadastrados no evento:</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>PIX</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.datetime}</td>
              <td>
                {user.datetimecheckout ? (
                  user.datetimecheckout
                ) : (
                  <IoMdCloseCircleOutline
                    title="Não Realizou o check-out ainda"
                    className="not-pix"
                  />
                )}
              </td>
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
      <QRCodeSVG value="00020126420014br.gov.bcb.pix0111496650628080205Teste5204000053039865802BR5925LETICIA VITORIA SANTOS DE6009SAO PAULO62290525a67e0HyNJlAGyQiu1FkPeekCG63043A2C" />
      <button onClick={handlePay} className="btn">
        Pagar
      </button>
      <div className="pay-container">
        {display &&
          users
            .filter((user) => user.pix)
            .map((user) => (
              <div key={user._id} className="qrcode-card">
                <QRCodeSVG value={generatePixCode(user)} />
                <h3>{user.name}</h3>
              </div>
            ))}
      </div>
    </div>
  );
};

export default EventDetail;
