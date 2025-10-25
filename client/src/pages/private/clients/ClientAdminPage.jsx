import useFetchClientAdmin from '../../../hooks/useFetchClientAdmin.js';
import ErrorMessage from '../../../components/ErrorMessage.jsx';

export default function ClientAdminPage() {
  const { user, nowLoading, errorMessage } = useFetchClientAdmin();

  const fromateDate = (date) => {
    return date;
  };

  return (
    <>
      {nowLoading ? (
        <div className="container">...</div>
      ) : (
        <>
          <div className="container">
            <div className="banner is-primary ">
              <div className="banner-body">
                <h1 className="sub-title is-size-5-mobile mb-0">
                  Добро, пожаловать <nobr>{user && user.name}!</nobr>
                </h1>
              </div>
            </div>
          </div>

          <article>
            <div className="container">
              <div className="section mr-0 ml-0">
                <div className="columns">
                  <div className="column is-5">
                    <div className="is-size-7 mb-3">
                      Тел:{' '}
                      <span className="bright">
                        {user.phone ? user.phone : <>Не указан</>}
                      </span>{' '}
                    </div>
                    <div className="is-size-7 mb-3">
                      Почта: <span className="bright">{user.email || ''}</span>
                    </div>
                    <div className="is-size-7 mb-3">
                      Всего покупок: <span className="bright">0</span>{' '}
                    </div>
                    <div className="is-size-7 mb-3">
                      Дата рег.: <span>{fromateDate(user.createdAt)}</span>{' '}
                    </div>
                  </div>
                  <div className="column is-7">
                    <div className="is-size-4 mb-5">
                      Баланс: <span className="bright">1000 Ф</span>
                    </div>
                    <div className="is-size-6 mb-4">
                      Экономия на сегодня:{' '}
                      <span className="bright">350 Руб.</span>
                    </div>
                    <div className="is-size-6 mb-4">
                      Текущий курс (0.95):{' '}
                      <span className="bright">1000 Ф = 650 Руб.</span>
                    </div>

                    <br />
                    <h2>Фьючерсы</h2>

                    <div className="level is-1" style={{ maxWidth: '250px' }}>
                      <input
                        type="number"
                        className="input level-item is-medium has-text-right"
                        placeholder="1000"
                      />
                      <button className="button level-item is-medium is-primary">
                        Купить
                      </button>
                    </div>

                    <br />
                  </div>
                </div>
              </div>
            </div>

            <div className="container ">
              <div className="section mr-0 ml-0">
                <hr />
                <h2 className="title">История</h2>
                {/* <p>Нет записей</p> */}
                <div className="mb-3">
                  11.10.2025 - купил{' '}
                  <span className="bright">
                    <strong>1000 Ф</strong> (курс: 0.90) Экономия 100 руб.
                  </span>{' '}
                </div>
                <div className="mb-3">
                  12.10.2025 - потратил{' '}
                  <span className="is-danger">
                    <strong>200 Ф</strong> Менеджер: Евгений / pogreb@inbox.ru
                  </span>
                </div>
              </div>
            </div>

            <div className="container">
              {errorMessage && <ErrorMessage message={errorMessage} />}
            </div>
          </article>
        </>
      )}
    </>
  );
}
