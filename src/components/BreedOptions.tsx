import React from 'react';

import DogCard from './DogCard';

import chihuahua from '~/assets/chihuahua.jpg';
import husky from '~/assets/husky.webp';
import labrador from '~/assets/labrador.jpeg';
import pug from '~/assets/pug.jpg';

import { BreedOptionsProps, DogBreed } from '~/models';

const BreedOptions: React.FC<BreedOptionsProps> = ({ breed, setBreed, setCurrentPage }) => {
  const selectDogBreed = (breed: DogBreed) => {
    setBreed(breed);
    setCurrentPage(1);
  };

  return (
    <div className='mt-[45px] w-fit flex flex-col items-center'>
      <p className='text-xl sm:self-start mt-12'>Olá, bem-vindo(a) de volta!</p>
      <p className='sm:self-start text-gray-700 mt-4'>Escolha uma raça para ver suas fotos:</p>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-12'>
        <DogCard
          title='Chihuahua'
          image={chihuahua}
          text='O Chihuahua é uma das menores raças de cães do mundo. Seu nome vem da região de Chihuahua, no México.'
          onClick={() => selectDogBreed('chihuahua')}
          selected={breed === 'chihuahua'}
        />
        <DogCard
          title='Husky'
          image={husky}
          text='O Husky Siberiano é uma raça de cães de trenó de tamanho médio. Surgiram no nordeste da Ásia.'
          onClick={() => selectDogBreed('husky')}
          selected={breed === 'husky'}
        />
        <DogCard
          title='Labrador'
          image={labrador}
          text='O Labrador é uma raça britânica de cão de caça retriever. Está entre os cães mais presentes em diversos países.'
          onClick={() => selectDogBreed('labrador')}
          selected={breed === 'labrador'}
        />
        <DogCard
          title='Pug'
          image={pug}
          text='O pug é uma raça de cachorro originária da China. Pugs são conhecidos por serem cães companheiros, sociáveis e gentis.'
          onClick={() => selectDogBreed('pug')}
          selected={breed === 'pug'}
        />
      </div>
    </div>
  );
};

export default BreedOptions;
