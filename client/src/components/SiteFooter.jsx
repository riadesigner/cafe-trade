import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getPayloads } from '../utils/payloads';

export default function SiteFooter() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const savedUser = getPayloads();
  const userRole = savedUser ? savedUser.role : 'unknown';

  const navTo = {
    client: '/cp/cafe-client',
    manager: '/cp/cafe-manager',
    administrator: '/cp/cafe-administrator',
    unknown: '/',
  };

  const dologout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="section container is-max-desktop mt-6">
        <div className="level mt-6">
          <div className="level-item is-left">
            <Link to="/">
              <div
                style={{
                  padding: '10px',
                  display: 'inline-block',
                  background: '#eaeaea',
                  margin: '0 auto',
                }}
              >
                LOGO
              </div>
            </Link>
          </div>
          <hr className="mobile-only" />
          <div className="level-item is-right yo-footer-menu">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'level-item is-active mb-4-mobile mr-4 mr-0-mobile'
                  : 'level-item mb-4-mobile mr-4 mr-0-mobile'
              }
            >
              О бирже
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to={navTo[userRole]}
                  className={({ isActive }) =>
                    isActive
                      ? 'level-item is-active mb-4-mobile mr-4 mr-0-mobile'
                      : 'level-item mb-4-mobile mr-4 mr-0-mobile'
                  }
                >
                  Кабинет
                </NavLink>
                <button className="button mt-2-mobile" onClick={dologout}>
                  Выйти
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'level-item is-active mb-4-mobile mr-4 mr-0-mobile'
                    : 'level-item mb-4-mobile mr-4 mr-0-mobile'
                }
              >
                Войти
              </NavLink>
            )}
          </div>
        </div>
      </div>

      <div className="site-footer mt-5">
        <br />
      </div>
    </>
  );
}
