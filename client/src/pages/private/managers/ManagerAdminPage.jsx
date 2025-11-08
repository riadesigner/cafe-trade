import useFetchManager from '../../../hooks/useFetchManager.js';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../../components/ErrorMessage.jsx';

export default function ManagerAdminPage() {
  const { user, deals, nowLoading, errorMessage } = useFetchManager();

  return (
    <>
      <article>
        <div className="container">
          <div className="section ml-0  mr-0">
            <div className="columns mb-5">
              <div className="column is-6">
                <div>Кабинет Менеджера</div>
                <p>
                  <small>{user && user.email}</small>
                </p>
                <div>
                  Всего продаж: <span className="bright">0</span>
                </div>
                <br />
              </div>
              <div className="column is-6">
                <Link to="/cp/cafe-manager/new-deal">
                  <button className="button is-danger">Продать товар</button>
                </Link>
              </div>
            </div>

            <hr />

            <div className="block mb-6 mb-5-mobile">
              <h1 className="title is-size-5">История продаж:</h1>
              {nowLoading ? (
                <p>...loading</p>
              ) : deals && deals.length > 0 ? (
                deals.map((d) => {
                  return <div key={d.id}>Deal!</div>;
                })
              ) : (
                <p className="mt-0">
                  <small>Нет зарегистрированных продаж</small>
                </p>
              )}
            </div>
          </div>
        </div>

        {errorMessage && <ErrorMessage message={errorMessage} />}
      </article>
    </>
  );
}
