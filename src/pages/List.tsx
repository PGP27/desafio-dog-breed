import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '~/contexts/AuthContext';

import { api } from '~/services/index.service';

import LoadingScreen from '~/components/LoadingScreen';
import Header from '~/components/Header';
import BreedOptions from '~/components/BreedOptions';
import PhotosNumber from '~/components/PhotosNumber';
import DogsList from '~/components/DogsList';
import Pagination from '~/components/Pagination';

import { DogBreed } from '~/models';

const List = () => {
  const { token } = useAuth();
  const [breed, setBreed] = useState<DogBreed>('chihuahua');
  const [dogsList, setDogsList] = useState<string[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const [maxPhotos, setMaxPhotos] = useState<number>(30);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showBigImage, setShowBigImage] = useState<string>('');
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const maxPages = useMemo(() => {
    const max = Math.ceil(dogsList.length / maxPhotos);
    if (currentPage && max && currentPage > max) {
      setCurrentPage(1);
    }
    return max;
  }, [dogsList, maxPhotos, currentPage]);

  const pagesArray = useMemo(() => {
    if (maxPages) {
      const array = [];
      for (let i = 1; i <= maxPages; i += 1) {
        array.push(i);
      }
      return array;
    }
    return [];
  }, [maxPages]);

  const middlePx = useMemo(() => {
    return window.innerHeight / 2 + scrollPosition - 241;
  }, [scrollPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const getDogsList = async () => {
      setLoadingList(true);
      await api
        .get('/list', { headers: { Authorization: `${token}` }, params: { breed } })
        .then((res) => setDogsList(res.data.list));
      setLoadingList(false);
    };
    getDogsList();
  }, [breed, token]);

  if (loadingList) return <LoadingScreen />;

  return (
    <div className='relative h-full w-full flex flex-col items-center'>
      <Header />
      <div className='w-full flex flex-col items-center'>
        <BreedOptions breed={breed} setBreed={setBreed} setCurrentPage={setCurrentPage} />
        <div className='mt-20'>
          <PhotosNumber setMaxPhotos={setMaxPhotos} />
          <DogsList
            dogsList={dogsList}
            maxPhotos={maxPhotos}
            currentPage={currentPage}
            setShowBigImage={setShowBigImage}
          />
          <Pagination
            pagesArray={pagesArray}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      {showBigImage && (
        <button
          onClick={() => setShowBigImage('')}
          className='absolute h-full w-full cursor-default bg-black/30 backdrop-blur-md z-50'
        >
          <div
            style={{ top: `${middlePx}px` }}
            className='fixed left-1/2 -translate-x-1/2 w-fit bg-neutral-100 p-4 pb-20 border rounded'
          >
            <img src={showBigImage} alt='Dog' className='h-96 w-96 border' />
          </div>
        </button>
      )}
    </div>
  );
};

export default List;
