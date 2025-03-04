// src/components/Pagination.jsx
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={'Anterior'}
      nextLabel={'Siguiente'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      containerClassName={'flex justify-center mt-4 space-x-2'}
      activeClassName={'bg-blue-500 text-white px-3 py-1 rounded'}
      pageClassName={'px-3 py-1 rounded cursor-pointer'}
    />
  );
};

export default Pagination;