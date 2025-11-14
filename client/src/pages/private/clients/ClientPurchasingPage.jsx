import ErrorMessage from '../../../components/ErrorMessage.jsx';
import Breadcrumb from '../../../components/Breadcrumb.jsx';
import useFetchClientPurchasing from '../../../hooks/useFetchClientPurchasing.js';

export default function ClientPurchasingPage() {
  const {
    nowLoading,
    errorMessage,
    hdlConfirm,
    currentExchangeRate,
    currentPrice,
    WSM_amount,
  } = useFetchClientPurchasing();

  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/cafe-client', title: 'Кабинет клиента' },
    { link: '#', title: 'подтверждние покупки', isActive: true },
  ];

  return (
    <>
      <div className="container">
        <div className="section mr-0 ml-0">
          <div>
            <h1 className="title is-size-4 is-size-5-mobile">
              Покупка Wall Street Монет
            </h1>
          </div>

          <Breadcrumb links={links} />

          <p>&nbsp;</p>

          <article>
            <div className="box">
              <h2 className="title is-size-6 mb-5">Подтвердите покупку</h2>
              <div className="columns">
                <div className="column is-6">
                  {nowLoading ? (
                    <p>... loading</p>
                  ) : (
                    <>
                      <div className="is-size-4 mb-3">
                        Товар:{' '}
                        <span className="bright">
                          {WSM_amount} WSM<sup>*</sup>
                        </span>{' '}
                      </div>
                      <div className="is-size-4 mb-5">
                        Цена:{' '}
                        {currentPrice > 0 ? (
                          <span className="bright">{currentPrice} руб.</span>
                        ) : (
                          <>...</>
                        )}
                      </div>
                      <hr />
                      <div className="is-size-6 mb-3">
                        Текущий курс ={' '}
                        <span className="bright">
                          {currentExchangeRate / 100}
                        </span>
                      </div>
                      <div className="is-size-6">
                        Ваша выгода<sup>**</sup> ={' '}
                        <span className="bright">
                          {WSM_amount - currentPrice} руб.
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <div className="column is-6 is-right pt-5-mobile">
                  {!nowLoading && (
                    <button
                      className="button is-medium is-primary"
                      onClick={(e) => hdlConfirm(e)}
                    >
                      Подтвердить
                    </button>
                  )}
                </div>
              </div>
            </div>
            <p>&nbsp;</p>
            <p>&nbsp;</p>

            <p>
              <small>
                <sup>**</sup>При расчете WS Монетами в кафе WallStreet во
                Владивостоке.
              </small>
            </p>

            {errorMessage && <ErrorMessage message={errorMessage} />}
          </article>
        </div>
      </div>
    </>
  );
}
