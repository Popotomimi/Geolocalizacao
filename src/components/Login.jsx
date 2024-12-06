// Hooks
import { useState, useContext } from "react";

// Context
import { Context } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    login(user);
  };

  return (
    <div className="login-page">
      <h1>Fazer Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-container">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
