import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './ManagerItem.module.css';

export default function ManagerItem({ data, hdlDeleteManager, nowDeleting }) {
  return (
    <div className={styles.item}>
      <div className={styles.itemEmail}>
        <button className="button is-fluid is-left is-inverted">
          {data.email}
        </button>
      </div>
      <div className={styles.space}></div>
      <div className={styles.itemRemove}>
        {nowDeleting ? (
          <button className="button is-fluid">x</button>
        ) : (
          <button
            className="button is-fluid is-danger"
            onClick={(e) => hdlDeleteManager(e, data.email)}
          >
            x
          </button>
        )}
      </div>
    </div>
  );
}

ManagerItem.propTypes = {
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  hdlDeleteManager: PropTypes.func.isRequired,
  nowDeleting: PropTypes.bool,
};

// Опционально: значения по умолчанию
ManagerItem.defaultProps = {
  nowDeleting: false,
};
