import React from 'react';

import { PhotosNumberProps } from '~/models';

const PhotosNumber: React.FC<PhotosNumberProps> = ({ setMaxPhotos }) => {
  return (
    <div className='flex justify-center mb-8'>
      <label htmlFor='select-number-photos'>Mostrar por página:</label>
      <select
        id='select-number-photos'
        onChange={({ target: { value } }) => setMaxPhotos(Number(value))}
        className='outline-none ml-2'
      >
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default PhotosNumber;
