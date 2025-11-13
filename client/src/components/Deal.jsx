import { formatDateTime } from '../utils/dateUtilits';
import PropTypes from 'prop-types';

export default function Deal({ data }) {
  const profit =
    data.type == 'purchase'
      ? data.coins - Math.round((data.exchangeRate / 100) * data.coins)
      : 0;

  return (
    <>
      {data.type == 'purchase' ? (
        <div className="mb-3 is-size-7">
          {formatDateTime(data.createdAt)} - купил &nbsp;
          <span className="bright">
            <strong>{data.coins} WSM</strong> (курс: {data.exchangeRate / 100})
            Экономия {profit} руб.
          </span>
        </div>
      ) : (
        <div className="mb-3 is-size-7">
          12.10.2025 - потратил &nbsp;
          <span className="is-danger">
            <strong>- 200 WSM</strong> Менеджер: Евгений / pogreb@inbox.ru
          </span>
        </div>
      )}
    </>
  );
}

Deal.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    coins: PropTypes.number,
    exchangeRate: PropTypes.number,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  }),
};

Deal.defaultProps = {
  data: {},
};
