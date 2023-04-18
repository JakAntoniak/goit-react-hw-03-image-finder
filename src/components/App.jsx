import { Component } from 'react';
import Searchbar from './ImageFinder/Searchbar/Searchbar';
import ImageGallery from './ImageFinder/ImageGallery/ImageGallery';
import { Loader } from './ImageFinder/Loader/Loader';
import Modal from './ImageFinder/Modal/Modal';
import Button from './ImageFinder/Button/LoadMoreButton';

const KEY = '33185043-dc389dc3b605958bff2737f65';

class App extends Component {
  state = {
    galleryItems: [],
    totalItems: 0,
    pages: 0,
    currentInput: '',
    isLoading: false,
    isModalShown: false,
    modalImageSource: '',
    modalAlt: '',
  };

  fetchPictures = async url => {
    const pictures = await fetch(url);
    const picturesJson = await pictures.json();
    return picturesJson.hits;
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({
      isLoading: true,
      totalItems: 0,
    });

    const page = 1;
    const input = event.target[1]['value'];
    const URL = `https://pixabay.com/api/?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const pictures = await this.fetchPictures(URL);
    const query = await fetch(URL);
    const queryJson = await query.json();

    this.setState({
      galleryItems: pictures,
      currentInput: input,
      pages: page,
      isLoading: false,
      totalItems: queryJson.totalHits,
    });
  };

  handleLoadMore = async () => {
    this.setState({
      isLoading: true,
    });

    const prevGalleryItems = this.state.galleryItems;
    const page = this.state.pages + 1;
    const input = this.state.currentInput;

    const URL = `https://pixabay.com/api/?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const newPictures = await this.fetchPictures(URL);

    this.setState({
      galleryItems: [...prevGalleryItems, ...newPictures],
      pages: page,
      isLoading: false,
    });
  };

  handleImageClick = event => {
    const id = event.target.id;

    const pictureObject = this.state.galleryItems.find(
      element => element.id === Number(id)
    );

    this.setState({
      isModalShown: true,
      modalImageSource: pictureObject.largeImageURL,
    });
  };

  handleEscClose = event => {
    if (event.key === 'Escape') {
      this.setState({
        isModalShown: false,
      });
    }
  };

  handleClose = event => {
    if (event.target === event.currentTarget) {
      this.setState({
        isModalShown: false,
      });
    }
  };
  render() {
    const {
      galleryItems,
      isModalShown,
      modalImageSource,
      modalAlt,
      isLoading,
      totalItems,
    } = this.state;
    const isGalleryItemsShown = galleryItems['length'] === 0 ? false : true;
    console.log(totalItems);
    return (
      <>
        {isModalShown && (
          <Modal
            src={modalImageSource}
            alt={modalAlt}
            handleClose={this.handleClose}
            handleEscClose={this.handleEscClose}
          />
        )}
        <Searchbar handleSubmit={this.handleSubmit} />
        {isLoading && <Loader isLoading={isLoading} />}
        <ImageGallery
          galleryItems={galleryItems}
          handleImageClick={this.handleImageClick}
        />
        {isGalleryItemsShown && totalItems > galleryItems.length ? (
          <Button handleLoadMore={this.handleLoadMore} />
        ) : (
          <></>
        )}
      </>
    );
    {
    }
  }
}

export default App;
