import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getPayloads } from '../utils/payloads';
import logo from '../i/logo-1.png';

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
            <div className="level">
              <Link to="/" className="level-item mb-3-mobile">
                <div className="ws-cafe-trade-logo">WS-CAFE-TRADE</div>
              </Link>
              <a
                className="level-item mb-3-mobile"
                href="https://wallstreetvl.ru/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={logo}
                  style={{
                    width: '34px',
                    height: 'auto',
                    verticalAlign: 'middle',
                  }}
                />{' '}
                WallStreet{' '}
              </a>
              <a className="level-item mb-3-mobile" href="tel:+79084449818">
                +7 (908) 444‒98‒18
              </a>
              <a
                className="level-item mb-3-mobile"
                href="mailto:WallStreetvl@mail.ru"
              >
                WallStreetvl@mail.ru
              </a>
            </div>
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

        <p
          className="mt-4 mb-4 has-text-centered"
          style={{ fontSize: '.7rem', lineHeight: '1.5' }}
        >
          Адрес: 690091, Приморский край,{' '}
          <nobr>г. Владивосток, ул. Мордовцева, 6</nobr>
          <br /> ИП Карнаушко И.А., ИНН: 250306226676, ОГРН: 316250300051920
        </p>
      </div>

      <div className="site-footer mt-5">
        <br />
      </div>
    </>
  );
}
