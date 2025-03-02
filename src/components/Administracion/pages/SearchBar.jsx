import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ data, setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term.trim()) {
      setSearchResults(data);
      return;
    }

    const filteredData = data.filter((item) => {
      // Buscar en propiedades de primer nivel
      const firstLevelMatch = Object.entries(item).some(([key, value]) => {
        // Ignorar objetos anidados y arrays en esta parte
        if (typeof value !== 'object' && value !== null) {
          return String(value).toLowerCase().includes(term);
        }
        return false;
      });

      if (firstLevelMatch) return true;

      // Buscar en visibleData si existe
      if (item.visibleData) {
        return Object.values(item.visibleData).some(value => 
          String(value).toLowerCase().includes(term)
        );
      }

      return false;
    });

    setSearchResults(filteredData);
  };

  return (
    <div className="relative flex items-center">
      <FaSearch className="absolute left-3 text-gray-400" />
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;