import React from 'react';

const SearchBar = ({ keyword, setKeyword }) => {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search For Your Pokémon"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchBar;
