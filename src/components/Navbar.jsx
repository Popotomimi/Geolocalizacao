// React Router Dom
import { Link } from "react-router-dom";

// Context
import { Context } from "../context/UserContext";
import { useContext } from "react";

// Icons
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Check in</Link>
        </li>
        <li>
          <Link to="/checkout">Check out</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <button className="logout" onClick={logout}>
                <LuLogOut /> Sair
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
