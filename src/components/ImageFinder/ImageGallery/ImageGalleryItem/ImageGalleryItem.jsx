import PropTypes from 'prop-types';
import css from './Style.module.css';

const ImageGalleryItem = ({ src, alt, id }) => {
  return (
    <li className={css['gallery-item']}>
      <img
        className={css['gallery-item__image']}
        src={src}
        alt={alt}
        id={id}
      ></img>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.number,
};

export default ImageGalleryItem;
