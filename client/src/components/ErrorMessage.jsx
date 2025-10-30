import PropTypes from 'prop-types';

export default function ErrorMessage({ message }) {
  return (
    <section className="container">
      <div className="section has-text-centered is-danger ml-0 mr-0">
        Ошибка: {message}!
      </div>
    </section>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
