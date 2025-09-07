import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ setToken, role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "10px",
        borderBottom: "1px solid #ccc",
        zIndex: 1000,
      }}
    >
      {role == "user" ? (
        <>
          <Link to="/vote" style={{ marginRight: "10px" }}>
            Vote
          </Link>
          <Link to="/results" style={{ marginRight: "10px" }}>
            Results
          </Link>
        </>
      ) : (
        ""
      )}
      {role == "admin" ? (
        <>
          <Link to="/summary" style={{ marginRight: "10px" }}>
            Summary
          </Link>
          <Link to="/users" style={{ marginRight: "10px" }}>
            Users
          </Link>
        </>
      ) : (
        ""
      )}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
