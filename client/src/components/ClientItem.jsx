import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './ClientItem.module.css';

export default function ClientItem({ data }) {
  return (
    <div className={styles.item}>
      <div className={styles.email}>
        <button className="button is-fluid is-left is-inverted is-small-mobile">
          <div className="bright">{data.name}</div> {data.email}
        </button>
      </div>
      <div className={styles.phone}>
        <button className="button is-fluid is-left is-small-mobile">
          {data.phone ? data.phone : 'телефон не указан'}
        </button>
      </div>
    </div>
  );
}

ClientItem.propTypes = {
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number,
    name: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};
