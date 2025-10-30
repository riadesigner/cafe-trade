import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './ManagerItem.module.css';

export default function ManagerItem({ data }) {
  return (
    <div className={styles.item}>
      <div className={styles.itemEmail}>
        <button className="button is-fluid is-left is-inverted">
          {data.email}
        </button>
      </div>
      <div className={styles.space}></div>
      <div className={styles.itemRemove}>
        <button className="button is-fluid is-danger">x</button>
      </div>
    </div>
  );
}

// Добавьте это:
ManagerItem.propTypes = {
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    // добавьте другие свойства, которые есть в data
    id: PropTypes.number,
    name: PropTypes.string,
    // и т.д.
  }).isRequired,
};
