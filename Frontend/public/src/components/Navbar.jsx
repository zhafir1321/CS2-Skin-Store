import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <>
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <Link
            to={'/home'}
            className="btn btn-ghost text-2xl font-extrabold items-center"
          >
            CS2 Skin Store
          </Link>
        </div>
        <div className="navbar-end">
          <a className="btn btn-ghost text-sm" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
    </>
  );
}
