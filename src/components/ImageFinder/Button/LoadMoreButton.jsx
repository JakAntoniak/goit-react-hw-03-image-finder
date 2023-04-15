import PropTypes from 'prop-types';
import css from './Style.module.css';

const Button = ({ handleLoadMore }) => {
  return (
    <button
      className={css.button}
      type="button"
      onClick={() => handleLoadMore()}
    >
      Load More
    </button>
  );
};

export default Button;

Button.propTypes = {
  handleLoadMore: PropTypes.func,
};
