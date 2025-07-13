import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold">Task Manager</div>
      <div className="space-x-4">
        {isLoggedIn() ? (
          <>
            <Link to="/">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
