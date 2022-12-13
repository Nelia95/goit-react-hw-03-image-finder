import { Component } from 'react';
import style from './Searchbar.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';

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
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.SearchFormButton}>
            <IconContext.Provider
              value={{
                color: 'blue',
                size: '3em',
                className: 'global-class-name',
              }}
            >
              <div>
                <BiSearchAlt />
              </div>
            </IconContext.Provider>
            ;<span className={style.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.SearchFormInput}
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
