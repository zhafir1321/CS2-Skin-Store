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
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              Sell Item
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={'/sell-item-knife'}>Knife</Link>
              </li>
              <li>
                <Link to={'/sell-item-pistol'}>Pistol</Link>
              </li>
              <li>
                <Link to={'/sell-item-smg'}>SMG</Link>
              </li>
              <li>
                <Link to={'/sell-item-shotgun'}>Shotgun</Link>
              </li>
              <li>
                <Link to={'/sell-item-machinegun'}>Machinegun</Link>
              </li>
              <li>
                <Link to={'/sell-item-rifle'}>Rifle</Link>
              </li>
            </ul>
          </div>
        </div>
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
