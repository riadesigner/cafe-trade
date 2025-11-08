import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './ClientItem.module.css';

export default function ClientItem({ data, setCurrent }) {
  const phone = data.phone ?? 'телефон не указан';
  const coins = parseInt(data.totalCoins, 10);
  const full = data.totalCoins;

  return (
    <div className={styles.item} onClick={(e) => setCurrent(e, data.id)}>
      <span>{phone}</span>
      <span>{data.name}</span>
      <span>{data.email}</span>
      {full && (
        <div>
          <span> : </span>
          <span>{coins} WSM</span>
        </div>
      )}
    </div>
  );
}

ClientItem.propTypes = {
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number,
    name: PropTypes.string,
    phone: PropTypes.string,
    totalCoins: PropTypes.number,
  }).isRequired,
  setCurrent: PropTypes.string,
};
