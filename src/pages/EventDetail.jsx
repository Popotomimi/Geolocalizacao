// Hooks
import React, { useEffect, useState } from "react";

// React Router Dom
import { useParams } from "react-router-dom";

// Axios
import axios from "axios";

// Icons
import { IoMdCloseCircleOutline } from "react-icons/io";

// Biblioteca de QR Code
import QRCode from "qrcode";

const EventDetail = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [qrCodes, setQrCodes] = useState({});
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

  const generatePixQRCode = async (pixData, value) => {
    const pixCode = `00020126330014BR.GOV.BCB.PIX0114${pixData}5204000053039865802BR5925Nome do Recebedor6009Cidade54060000002506304`;

    const calculateCRC16 = (pixString) => {
      let crc = 0xffff;
      for (let pos = 0; pos < pixString.length; pos++) {
        crc ^= pixString.charCodeAt(pos) << 8;
        for (let i = 0; i < 8; i++) {
          if ((crc & 0x8000) !== 0) {
            crc = (crc << 1) ^ 0x1021;
          } else {
            crc = crc << 1;
          }
        }
      }
      return (crc & 0xffff).toString(16).toUpperCase();
    };

    const crc16 = calculateCRC16(pixCode);
    const finalPixCode = pixCode + crc16;

    try {
      const url = await QRCode.toDataURL(finalPixCode);
      return url;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  const handlePay = async () => {
    setDisplay(true);
    const qrCodesTemp = {};
    for (const user of users.filter((user) => user.pix)) {
      const qrCodeUrl = await generatePixQRCode(user.pix, "0000000250"); // Exemplo de valor fixo
      qrCodesTemp[user._id] = qrCodeUrl;
    }
    setQrCodes(qrCodesTemp);
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
      <button onClick={handlePay} className="btn">
        Pagar
      </button>
      <div className="pay-container">
        {display &&
          users
            .filter((user) => user.pix)
            .map((user) => (
              <div key={user._id} className="qrcode-card">
                {" "}
                {qrCodes[user._id] ? (
                  <img src={qrCodes[user._id]} alt={user.name} />
                ) : (
                  "Gerando QR Code..."
                )}{" "}
                <h3>{user.name}</h3>{" "}
              </div>
            ))}
      </div>
    </div>
  );
};

export default EventDetail;
