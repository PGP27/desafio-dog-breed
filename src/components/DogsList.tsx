import React from 'react';

import { DogsListProps } from '~/models';

const DogsList: React.FC<DogsListProps> = ({
  dogsList,
  maxPhotos,
  currentPage,
  setShowBigImage,
}) => {
  return (
    <div className='w-full grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
      {dogsList
        .slice(maxPhotos * currentPage - maxPhotos, maxPhotos * currentPage)
        .map((image: string, index: number) => {
          return (
            <button
              key={index}
              className='w-fit bg-neutral-100 p-3 pb-8 border rounded transition hover:bg-neutral-300'
              onClick={() => setShowBigImage(image)}
            >
              <img src={image} alt='Dog' className='h-40 w-40 border' />
            </button>
          );
        })}
    </div>
  );
};

export default DogsList;
