import PropTypes from 'prop-types';
import { RotatingLines } from 'react-loader-spinner';
import css from './Style.module.css';

export const Loader = ({ isLoading }) => {
  return (
    <div className={css['loader-wrapper']}>
      <RotatingLines
        strokeColor="black"
        strokeWidth="5"
        animationDuration="1"
        width="96"
        visible={isLoading}
        className={css.loader}
      />
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
};
