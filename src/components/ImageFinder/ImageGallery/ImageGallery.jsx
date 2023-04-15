import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './Style.module.css';

class ImageGallery extends Component {
  static defaultProps = {
    galleryItems: [],
    pages: 0,
  };

  static propTypes = {
    galleryItems: PropTypes.array,
    pages: PropTypes.number,
  };

  render() {
    return (
      <ul
        className={css['image-gallery']}
        onClick={this.props.handleImageClick}
      >
        {this.props.galleryItems.map(image => (
          <ImageGalleryItem
            key={image.id}
            id={image.id}
            src={image.webformatURL}
            alt={image.tags}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
