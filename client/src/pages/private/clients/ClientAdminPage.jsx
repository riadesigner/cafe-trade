import useFetchClientAdmin from '../../../hooks/useFetchClientAdmin.js';
import ErrorMessage from '../../../components/ErrorMessage.jsx';
import Deal from '../../../components/Deal.jsx';
import { formatDate } from '../../../utils/dateUtilits.jsx';

export default function ClientAdminPage() {
  const {
    user,
    deals,
    coinsData,
    nowLoading,
    nowLoadingDeals,
    errorMessage,
    hdlBuy,
    userInputCoins,
    setUserInputCoins,
    currentExchangeRate,
  } = useFetchClientAdmin();

  const calc_saving = (coins, rate) => {
    return coins > 0 ? Math.round(coins - (coins * rate) / 100) : 0;
  };
  const currentExchangeRateStr = currentExchangeRate / 100;
  const cost1000 = (1000 * currentExchangeRate) / 100;
  const savingsTodayStr = calc_saving(1000, currentExchangeRate);
  const MAX_TO_BUY_WST_ONCE = 1000;

  return (
    <>
      {nowLoading ? (
        <div className="container">
          <p>... loading</p>
        </div>
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
                    Всего куплено:{' '}
                    <span className="bright">
                      {coinsData ? coinsData.totalPurchases : 0} WSM
                    </span>
                  </div>
                  <div className="is-size-7 mb-3">
                    Всего потрачено:{' '}
                    <span className="bright">
                      {coinsData ? coinsData.totalSpendings : 0} WSM
                    </span>
                  </div>
                  <div className="is-size-7 mb-3">
                    Дата рег.: <span>{formatDate(user.createdAt)}</span>
                  </div>
                </div>
                <div className="column is-7">
                  <div className="is-size-4 mb-5">
                    Баланс:{' '}
                    <span className="bright">
                      {coinsData ? coinsData.totalCoins : 0} WSM
                    </span>
                  </div>
                  <div className="is-size-6 mb-4">
                    Текущий курс ({currentExchangeRateStr}):{' '}
                    <span className="bright">
                      1000 WSM = <nobr>{cost1000} руб.</nobr>
                    </span>
                  </div>
                  <div className="is-size-6 mb-4">
                    Экономия сегодня:*{' '}
                    <span className="bright">
                      <nobr>{savingsTodayStr} руб.</nobr>
                    </span>
                    <p className="mt-1">
                      <small>
                        <i>
                          *При покупке товаров в кафе WallStreet на 1000 WSM
                        </i>
                      </small>
                    </p>
                  </div>
                  <br />
                  <h2>Wall Street Монеты</h2>

                  <div className="level is-1" style={{ maxWidth: '350px' }}>
                    <input
                      type="number"
                      className="input level-item is-medium has-text-right"
                      placeholder="1000"
                      onChange={(e) => {
                        let n = e.target.value;
                        let max = MAX_TO_BUY_WST_ONCE;
                        n = parseInt(n, 10) > max ? max : n;
                        setUserInputCoins(n);
                      }}
                      value={userInputCoins}
                    />
                    <button
                      className="button level-item is-medium is-primary"
                      onClick={(e) => {
                        hdlBuy(e);
                      }}
                    >
                      Купить&nbsp;WSM
                    </button>
                  </div>

                  <br />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <article>
        <div className="container ">
          <div className="section mr-0 ml-0">
            <hr />
            <h2 className="title">История</h2>
            {nowLoadingDeals ? (
              <>
                <p>... loading</p>
              </>
            ) : deals && deals.length > 0 ? (
              <>
                {deals.map((d) => {
                  return <Deal key={d.id} data={d} />;
                })}
              </>
            ) : (
              <p>Нет записей</p>
            )}

            <div className="container">
              <div className="section ml-0 mr-0">
                {errorMessage && <ErrorMessage message={errorMessage} />}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
