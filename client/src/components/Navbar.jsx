import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#282c34",
        padding: "15px",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link to="/dashboard" style={{ color: "white" }}>
      Dashboard
      </Link>

      <Link to="/login" style={{ color: "white" }}>
        Login
      </Link>

      <Link to="/register" style={{ color: "white" }}>
        Register
      </Link>

      <Link to="/courses" style={{ color: "white" }}>
        Courses
      </Link>
    </nav>
  );
}

export default Navbar;