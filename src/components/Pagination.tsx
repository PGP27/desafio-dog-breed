import React from 'react';

import { PaginationProps } from '~/models';

const Pagination: React.FC<PaginationProps> = ({ pagesArray, currentPage, setCurrentPage }) => {
  return (
    <div className='flex justify-center gap-2 my-8'>
      {pagesArray.map((page: number) => {
        return (
          <button
            key={page}
            type='button'
            onClick={() => setCurrentPage(page)}
            className={`p-2 text-sm hover:bg-neutral-200 hover:shadow-sm ${
              currentPage === page && 'border-2 border-blue-700'
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
