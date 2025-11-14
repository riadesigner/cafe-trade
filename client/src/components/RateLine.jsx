import { formatDateTime } from '../utils/dateUtilits';
import PropTypes from 'prop-types';

export default function RateLine({ data }) {
  const { exhangeRate, createdAt, id, delta } = data;
  const saveMoney = 1000 - exhangeRate * 1000;

  const getDelta = () => {
    return delta > 0 ? (
      <span className="is-primary">
        +{delta / 100} <i className="fas fa-arrow-up"></i>
      </span>
    ) : (
      <span className="is-danger">
        {delta / 100} <i className="fas fa-arrow-down"></i>
      </span>
    );
  };

  return (
    <div id={id} className="is-size-7 mb-2">
      {formatDateTime(createdAt)} &nbsp;
      <strong>({exhangeRate})</strong> &nbsp;
      {getDelta()} &nbsp;
      <span className="is-primary">
        Э <strong>{saveMoney}</strong> руб.
      </span>
    </div>
  );
}

RateLine.defaultProps = {
  data: {},
};

RateLine.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    exhangeRate: PropTypes.string,
    createdAt: PropTypes.string,
    delta: PropTypes.number,
  }),
};
