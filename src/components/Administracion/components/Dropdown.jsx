// src/components/Dropdown.jsx
import { useState } from 'react';

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200 px-4 py-2 rounded"
      >
        Seleccionar
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 bg-white border rounded shadow-md w-full">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;