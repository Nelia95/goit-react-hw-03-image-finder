import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags }) => {
  return (
    <li key={id}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};
