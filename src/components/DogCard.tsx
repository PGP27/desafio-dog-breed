import React from 'react';

import { DogCardModel } from '~/models';

const DogCard: React.FC<DogCardModel> = ({ title, image, text, selected, ...rest }) => {
  return (
    <button
      {...rest}
      type='button'
      className={`h-44 w-44 flex flex-col items-end justify-center group ${
        selected && 'border-4 border-blue-700'
      }`}
    >
      <div className='relative h-full w-full'>
        <div className='absolute h-full w-full z-10 p-4 flex items-center transition group-hover:backdrop-blur-lg bg-white/10'>
          <p className='hidden transition text-sm group-hover:flex'>{text}</p>
        </div>
        <img src={image} alt='Dog breed' className='absolute h-full w-full' />
      </div>
      <h3 className='w-full bg-gray-800 text-lg text-white z-20'>{title}</h3>
    </button>
  );
};

export default DogCard;
