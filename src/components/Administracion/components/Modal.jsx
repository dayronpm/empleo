// src/components/Modal.jsx
import { IoClose } from 'react-icons/io5';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 relative max-w-lg w-full">
        <IoClose
          size={24}
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;