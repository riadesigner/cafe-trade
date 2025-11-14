import HomeBanner from '../../components/HomeBanner';
import useFetchMainPage from '../../hooks/useFetchMainPage';
import RateLine from '../../components/RateLine';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';

export default function HomePage() {
  const {
    nowLoading,
    errorClientOnly,
    errorMessage,
    hdlGoToBuy,
    currentExchangeRate,
  } = useFetchMainPage();

  const cafeName = () => {
    return (
      <nobr>
        <strong>WallStreet</strong>
      </nobr>
    );
  };

  const rate = currentExchangeRate / 100;

  const allRates = [
    { id: '001', createdAt: '2024-01-15T10:30:45.123Z', exhangeRate: '0.69' },
    { id: '002', createdAt: '2024-01-15T10:30:45.123Z', exhangeRate: '0.79' },
    { id: '003', createdAt: '2024-01-15T10:30:45.123Z', exhangeRate: '0.89' },
    { id: '004', createdAt: '2024-01-15T10:30:45.123Z', exhangeRate: '0.91' },
    { id: '005', createdAt: '2024-01-15T10:30:45.123Z', exhangeRate: '0.69' },
    { id: '006', createdAt: '2024-01-15T10:30:45.123Z', exhangeRate: '0.79' },
    { id: '007', createdAt: '2024-01-15T10:30:45.123Z', exhangeRate: '0.89' },
    { id: '008', createdAt: '2024-01-15T10:30:45.123Z', exhangeRate: '0.91' },
    { id: '009', createdAt: '2024-01-15T10:30:45.123Z', exhangeRate: '0.69' },
    { id: '010', createdAt: '2024-01-15T10:30:45.123Z', exhangeRate: '0.79' },
    { id: '011', createdAt: '2024-01-15T10:30:45.123Z', exhangeRate: '0.89' },
    { id: '012', createdAt: '2024-01-15T10:30:45.123Z', exhangeRate: '0.91' },
  ];

  const allRatesWithDelta = allRates.map((rate, index, array) => {
    if (index === 0) {
      return {
        ...rate,
        delta: 0, // для первого элемента дельта = 0
      };
    }
    const currentRate = parseFloat(rate.exhangeRate) * 100;
    const previousRate = parseFloat(array[index - 1].exhangeRate) * 100;
    const delta = currentRate - previousRate;

    return {
      ...rate,
      delta: delta,
    };
  });

  return (
    <>
      <div className="section container">
        <HomeBanner />

        <div className="container">
          <div className="section mr-0 ml-0">
            <div className="columns">
              <div className="column is-5">
                <h2 className="title is-size-4">Текущий курс:</h2>
                <div className="is-size-7 mb-3">
                  Коэффициент: <span className="bright">{rate}</span>
                </div>
                <p className="is-size-4">1000 WSM = {rate * 1000} руб.</p>
              </div>
              <div className="column is-7">
                <h2 className="title is-size-4 is-size-6-mobile">
                  Wall Street Монеты<sup>*</sup>
                </h2>
                <div className="level is-1" style={{ maxWidth: '350px' }}>
                  <button
                    className="button level-item is-medium is-primary"
                    onClick={(e) => {
                      hdlGoToBuy(e);
                    }}
                  >
                    <span className="mr-6">Купить&nbsp;WSM</span>
                    <span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </button>
                  {errorClientOnly && (
                    <p className="is-danger mt-2 mb-2">Только для Клиентов</p>
                  )}
                </div>

                <br />
              </div>
            </div>
          </div>
        </div>
        <article>
          <div className="container">
            <div className="section mr-0 ml-0">
              <h2 className="title is-size-5 ">Динамика курса WSM:</h2>
              <hr />

              <div className="columns">
                <div className="column is-5">
                  {!nowLoading ? (
                    allRatesWithDelta &&
                    allRatesWithDelta.length &&
                    allRatesWithDelta.map((r) => (
                      <RateLine key={r.id} data={r} />
                    ))
                  ) : (
                    <>.. обновляем</>
                  )}

                  <div className="mb-4 is-primary mt-5">
                    <small>
                      (Э) – Ваша ЭКОНОМИЯ показана при покупке{' '}
                      <nobr>WSM на 1000 руб.</nobr>
                    </small>
                  </div>
                </div>
                <div className="column is-7">
                  <p className="mb-0">
                    <small>
                      <strong>
                        <sup>*</sup>WallStreet Монеты (WSM)
                      </strong>
                      – это цифровой товар кафе {cafeName()} по адресу г.
                      Владивосток, ул. Мордовцева, 6. Данный товар предназначен
                      только для обмена на продукцию кафе {cafeName()} согласно
                      текущему прейскуранту на день обмена, опубликованному на
                      сайте wallstreetvl.ru.&nbsp;
                      <Link to="/about" className="nav-link">
                        Подробные уловия покупки и использования цифрового
                        товара WMS <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </article>
      </div>
    </>
  );
}
