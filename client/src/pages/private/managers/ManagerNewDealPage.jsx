import useFetchManagerNewDeal from '../../../hooks/useFetchManagerNewDeal.js';
import ErrorMessage from '../../../components/ErrorMessage.jsx';
import Breadcrumb from '../../../components/Breadcrumb.jsx';
import ClientItem from '../../../components/ClientItem.jsx';

export default function ManagerNewDealPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/cafe-manager', title: 'Кабинет Менеджера' },
    { link: '#', title: 'Продажа', isActive: true },
  ];

  const {
    user,
    clientPhone,
    hdlChangeClientPhone,
    hdlSearchClients,
    hdlToSell,
    hdlSetCurrentClient,
    hdlChangeManagerInputs,
    managerInputCoins,
    foundClients,
    currentClientId,
    nowSearching,
    nowLoading,
    nowSelling,
    startSearching,
    errorMessage,
  } = useFetchManagerNewDeal();

  return (
    <>
      <article>
        <div className="container">
          <div className="section ml-0  mr-0">
            <div className="block">
              <Breadcrumb links={links} />
              <p>
                <small>{user ? user.email : '...'}</small>
              </p>
            </div>

            <div className="mb-3">Клиент</div>
            <div className="level is-1">
              <div className="level-item">
                <h2 className="title m-0">+7</h2>
              </div>
              <div className="level-item">
                <input
                  className="input is-medium "
                  type="number"
                  max="12"
                  value={clientPhone}
                  onChange={(e) => hdlChangeClientPhone(e, e.target.value)}
                />
              </div>
              <div className="level-item">
                <button
                  className="button is-medium is-primary is-fluid"
                  onClick={(e) => {
                    hdlSearchClients(e);
                  }}
                >
                  Найти
                </button>
              </div>
            </div>

            <div className="block mb-5">
              {nowSearching && <p>... ищем</p>}
              {foundClients && foundClients.length
                ? foundClients.map((u) => (
                    <ClientItem
                      key={u.id}
                      data={u}
                      setCurrent={hdlSetCurrentClient}
                    />
                  ))
                : startSearching && <p>нет совпадений</p>}
              {nowLoading && <p>... обновляем</p>}
            </div>

            {currentClientId && (
              <div className="block">
                <h1 className="title is-size-5">
                  Стоимость товара (в&nbsp;WSM):
                </h1>
                <div className="level">
                  <div className="level-item">
                    <input
                      type="number"
                      maxLength="4"
                      placeholder="0"
                      className="input "
                      value={managerInputCoins}
                      onChange={(e) => hdlChangeManagerInputs(e.target.value)}
                    />
                  </div>
                  <div className="level-item">
                    <button
                      className="button is-danger "
                      onClick={(e) => hdlToSell(e)}
                    >
                      Продать товар
                    </button>
                    {nowSelling && (
                      <div className="mt-2-mobile mb-2-mobile">
                        процессинг..
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {errorMessage && <ErrorMessage message={errorMessage} />}
      </article>
    </>
  );
}
