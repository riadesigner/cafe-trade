import useFetchAdmin from '../../../hooks/useFetchAdmin.js';
import ManagerItem from '../../../components/ManagerItem.jsx';
import ErrorMessage from '../../../components/ErrorMessage.jsx';

export default function AdministratorPage() {
  const {
    user,
    managers,
    nowLoading,
    nowSaving,
    addNewManager,
    newManagerName,
    setNewManagerName,
    newManagerEmail,
    setNewManagerEmail,
    errorMessage,
    errorMessageNewManager,
  } = useFetchAdmin();

  return (
    <>
      <article>
        <div className="container">
          <div className="section ml-0  mr-0">
            <div className="block">
              Кабинет Администратора
              <p>
                <small>{user && user.email}</small>
              </p>
            </div>
            <div className="columns is-8 is-4-mobile">
              <div className="column is-6">
                <div className="block mb-6 mb-5-mobile">
                  <h1 className="title is-size-5">Менеджеры</h1>
                  {nowLoading ? (
                    <p>...loading</p>
                  ) : managers && managers.length > 0 ? (
                    managers.map((m) => {
                      return <ManagerItem key={m.id} data={m}></ManagerItem>;
                    })
                  ) : (
                    <p className="mt-0">
                      <small>Нет зарегистрированных менеджеров</small>
                    </p>
                  )}
                </div>
                <div className="block">
                  <h2 className="title is-size-6 mb-4">Добавить менеджера</h2>
                  {nowLoading ? (
                    <p>...loading</p>
                  ) : (
                    <>
                      <div className="level is-1">
                        <div className="level-item">
                          <input
                            className="input"
                            type="text"
                            disabled={nowSaving}
                            placeholder="имя"
                            value={newManagerName}
                            onChange={(e) => setNewManagerName(e.target.value)}
                          />
                        </div>
                        <div className="level-item">
                          <input
                            className="input"
                            type="text"
                            disabled={nowSaving}
                            placeholder="email"
                            value={newManagerEmail}
                            onChange={(e) => setNewManagerEmail(e.target.value)}
                          />
                        </div>
                        <div className="level-item">
                          {nowSaving ? (
                            <button className="button is-primary is-fluid">
                              ...сохранение
                            </button>
                          ) : (
                            <button
                              className="button is-primary is-fluid"
                              onClick={(e) => addNewManager(e)}
                            >
                              Добавить
                            </button>
                          )}
                        </div>
                      </div>
                      {errorMessageNewManager && (
                        <p className="is-danger mt-2">
                          {errorMessageNewManager}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="column is-6">
                <h1 className="title is-size-5">Статистика</h1>
                <div className="block mb-5">
                  <div className="mb-3 is-size-6 is-size-7-mobile">
                    Всего клиентов: 4
                  </div>
                </div>
                <button className="button is-primary">
                  <span>Все клиенты</span>
                  <span className="icon">
                    <i className="fa fa-angle-right" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {errorMessage && <ErrorMessage message={errorMessage} />}
      </article>
    </>
  );
}
