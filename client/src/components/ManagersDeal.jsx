import { formatDateTime } from '../utils/dateUtilits';
import PropTypes from 'prop-types';

export default function ManagersDeal({ data }) {
  const strRate = data.exchangeRate / 100;
  const strPhone = data.user.phone ?? 'не указан';

  return (
    <div className="mb-3">
      {formatDateTime(data.createdAt)} - &nbsp;
      <span className="is-danger">
        <strong>{data.coins} WSM</strong> &nbsp;
      </span>
      <small>
        {' '}
        <span className="ml-2 mr-2">({strRate})</span> Клиент: {data.user.name}{' '}
        / {strPhone} / {data.user.email}
      </small>
    </div>
  );
}

ManagersDeal.propTypes = {
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

ManagersDeal.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    coins: PropTypes.number,
    exchangeRate: PropTypes.number,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

ManagersDeal.defaultProps = {
  data: {
    user: {
      name: '',
      email: '',
      phone: '',
    },
  },
};
