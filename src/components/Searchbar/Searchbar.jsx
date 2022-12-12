import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    imageName: '',
  };
  handleImageNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.imageName.trim() === '') {
      toast(`Enter the name of the picture`);
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };
  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.handleImageNameChange}
          />
        </form>
        <Toaster position="top-right" />
      </header>
    );
  }
}
SearchBar.propType = {
  handleSubmit: PropTypes.func,
  handleImageNameChange: PropTypes.func,
};
