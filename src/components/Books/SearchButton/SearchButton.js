import React from 'react';
import './SearchButton.scss';
import SearchIcon from '@material-ui/icons/Search';

const SearchButton = ({ searchText, handleChange }) => {
  return (
    <div className="content">
      <div className="search">
        <input
          type="text"
          className="search__input"
          aria-label="search"
          placeholder="Title or Author ..."
          value={searchText}
          onChange={handleChange}
        />
        <button className="search__submit" aria-label="submit search">
          <SearchIcon style={{ fontSize: '2rem', color: 'grey' }} />
        </button>
      </div>
    </div>
  );
};

export default SearchButton;
