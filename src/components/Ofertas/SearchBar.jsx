import React from 'react';

const SearchBar = ({ onSearch }) => {
    return (
        <input
            type="text"
            placeholder="Buscar oferta de trabajo"
            onChange={onSearch}
            className="border border-gray-300 rounded-lg p-2 w-1/3"
        />
    );
};

export default SearchBar;
