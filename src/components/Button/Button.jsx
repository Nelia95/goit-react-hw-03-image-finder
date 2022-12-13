import PropTypes from 'prop-types';
import style from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <button className={style.Button} type="button" onClick={onClick}>
      Load More
    </button>
  );
};
Button.propTypes = { onClick: PropTypes.func };
