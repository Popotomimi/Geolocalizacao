// React Route Dom
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <span>Código do evento: 99887766</span>
        </li>
        <li>
          <Link to="/admin">Table</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
