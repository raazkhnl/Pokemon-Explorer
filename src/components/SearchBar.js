import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ keyword, setKeyword }) => {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search Pokémon"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchBar;
