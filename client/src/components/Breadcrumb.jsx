import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ links }) {
  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        {links &&
          links.map((i, index) => {
            return i.isActive ? (
              <li key={index} className="is-active">
                <a>{i.title}</a>
              </li>
            ) : (
              <li key={index}>
                <Link to={i.link}>{i.title}</Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

// Добавьте это:
Breadcrumb.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      isActive: PropTypes.bool,
    })
  ),
};

// Опционально: значения по умолчанию
Breadcrumb.defaultProps = {
  links: [],
};
