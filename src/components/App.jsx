import { SearchBar } from './Searchbar/Searchbar';
import { fetchPictureByHits } from './api';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Spinner } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    query: '',
    isLoading: false,
    error: null,
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    const { query: currentQuery, page: currentPage } = this.state;
    const { query: prevQuery, page: prevPage } = prevState;

    if (prevQuery !== currentQuery || prevPage !== currentPage) {
      this.setState({ isLoading: true });
      fetchPictureByHits(currentQuery, currentPage)
        .then(images => {
          console.log(images);
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
          }));
        })
        .catch(error =>
          this.setState({ error: error.message, isLoading: false })
        )
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  handleFormSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {this.state.isLoading && <Spinner />}
        {this.state.images.length > 0 && (
          <>
            <ImageGallery images={this.state.images} />
            <Button onClick={this.handleLoadMore} />
          </>
        )}

        {/* {this.state.isLoading && <h1>waiting please</h1>}
        {this.state.image && <div>here will be image</div>} */}
      </div>
    );
  }
}
