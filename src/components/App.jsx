import { SearchBar } from './Searchbar/Searchbar';
import { fetchPictureByHits } from './api';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    image: [],
    imageName: '',
    isLoading: false,
    currentPage: 1,
    error: null,
  };
  componentDidUpdate(_, prevState) {
    if (prevState.imageName !== this.state.imageName) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { currentPage, imageName } = this.state;
    const page = currentPage;
    const query = imageName;
    const options = { query, page };
    console.log(query);

    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
      isLoading: true,
    }));
    fetchPictureByHits(options)
      .then(image => {
        if (image.length > 0) {
          console.log('hello');
          this.setState(prevState => ({
            image: [...prevState.image, ...image],
          }));
        } else {
          this.setState({ error: true });
        }
      })
      .catch(() => this.setState({ error: true }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleFormSubmit = imageName => {
    this.setState({
      imageName: imageName,
      image: [],
      currentPage: 1,
      error: null,
    });
  };
  // async componentDidMount() {
  //   try {
  //     this.setState({ isLoading: true });
  //     const image = await fetchPictureByHits();
  //     this.setState({ image });
  //   } catch (error) {
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }
  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {this.state.image.length > 0 && (
          <ImageGallery image={this.state.image} />
        )}

        {/* {this.state.isLoading && <h1>waiting please</h1>}
        {this.state.image && <div>here will be image</div>} */}
      </div>
    );
  }
}
