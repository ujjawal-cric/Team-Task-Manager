import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold text-xl">Project Manager</h1>

      {user && (
        <div className="flex gap-4 items-center">
          <Link to="/">Dashboard</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/tasks">Tasks</Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;