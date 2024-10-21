// Hooks
import { useState, useEffect } from "react";

// Axios
import axios from "axios";

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

  return (
    <div>
      <h1>AdminPage</h1>
      <div className="users-container">
        {users.map((user) => (
          <div key={user.id}>
            <p>Nome: {user.name}</p>
            <p>Localização: {user.location}</p>
            <p>------------------------------------</p>
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
