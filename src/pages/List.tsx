import { useEffect, useMemo, useState } from 'react';
import { api } from '~/services/index.service';
import { useAuth } from '~/contexts/AuthContext';
import LoadingScreen from '~/components/LoadingScreen';
import DogCard from '~/components/DogCard';
import chihuahua from '~/assets/chihuahua.jpg';
import husky from '~/assets/husky.webp';
import labrador from '~/assets/labrador.jpeg';
import pug from '~/assets/pug.jpg';
import Logo from '~/components/Logo';
import { SignOut } from 'phosphor-react';

const List = () => {
  const { token } = useAuth();
  const [breed, setBreed] = useState<string>('chihuahua');
  const [dogsList, setDogsList] = useState<string[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const [maxPhotos, setMaxPhotos] = useState<number>(30);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showBigImage, setShowBigImage] = useState<string>('');
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  
  const logout = () => {
    localStorage.clear();
    document.location.reload();
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const maxPages = useMemo(() => {
    const max = Math.ceil(dogsList.length / maxPhotos);
    if(currentPage && max && currentPage > max) {
      setCurrentPage(1);
    }
    return max;
  }, [dogsList, maxPhotos, currentPage]);

  const pagesArray = useMemo(() => {
    if(maxPages) {
      const array = [];
      for(let i = 1; i <= maxPages; i += 1) {
        array.push(i);
      }
      return array;
    }
    return [];
  }, [maxPages]);

  const middlePx = useMemo(() => {
    return (window.innerHeight / 2) + scrollPosition - 241;
  }, [scrollPosition]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
      <header className='w-full flex justify-between border-b shadow-sm py-1 p-2'>
        <Logo sm />
        <button
          title='Sair'
          className='p-2 rounded transition hover:bg-gray-100 hover:shadow-sm'
          onClick={logout}
        >
          <SignOut fontSize={20} />
        </button>
      </header>
      <div className='w-full flex flex-col items-center'>
        <div className='w-fit flex flex-col items-center'>
          <p className='text-xl sm:self-start mt-12'>Olá, bem-vindo(a) de volta!</p>
          <p className='sm:self-start text-gray-700 mt-4'>Escolha uma raça para ver suas fotos:</p>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-12'>
            <DogCard
              title='Chihuahua'
              image={chihuahua}
              text='O Chihuahua é uma das menores raças de cães do mundo. Seu nome vem da região de Chihuahua, no México.'
              onClick={() => {
                setBreed('chihuahua');
                setCurrentPage(1);
              }}
              selected={breed === 'chihuahua'}
            />
            <DogCard
              title='Husky'
              image={husky}
              text='O Husky Siberiano é uma raça de cães de trenó de tamanho médio. Surgiram no nordeste da Ásia.'
              onClick={() => {
                setBreed('husky');
                setCurrentPage(1);
              }}
              selected={breed === 'husky'}
            />
            <DogCard
              title='Labrador'
              image={labrador}
              text='O Labrador é uma raça britânica de cão de caça retriever. Está entre os cães mais presentes em diversos países.'
              onClick={() => {
                setBreed('labrador');
                setCurrentPage(1);
              }}
              selected={breed === 'labrador'}
            />
            <DogCard
              title='Pug'
              image={pug}
              text='O pug é uma raça de cachorro originária da China. Pugs são conhecidos por serem cães companheiros, sociáveis e gentis.'
              onClick={() => {
                setBreed('pug');
                setCurrentPage(1);
              }}
              selected={breed === 'pug'}
            />
          </div>
        </div>
        <div className='mt-20'>
          <div className='flex justify-center mb-8'>
            <label htmlFor="select-number-photos">Mostrar por página:</label>
            <select
              id="select-number-photos"
              onChange={({ target: { value } }) => setMaxPhotos(Number(value))}
              className='outline-none ml-2'
            >
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className='w-full grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {dogsList.slice((maxPhotos*currentPage) - maxPhotos , maxPhotos*currentPage).map((image: string, index: number) => {
              return (
                <button
                  key={index}
                  className='w-fit bg-neutral-100 p-3 pb-8 border rounded transition hover:bg-neutral-200'
                  onClick={() => setShowBigImage(image)}
                >
                  <img src={image} alt='Dog' className='h-40 w-40 border' />
                </button>
              );
            })}
          </div>
          <div className='flex justify-center gap-2 my-8'>
            {pagesArray.map((page: number) => {
              return (
                <button
                  key={page}
                  type='button'
                  onClick={() => setCurrentPage(page)}
                  className={`p-2 text-sm hover:bg-neutral-200 hover:shadow-sm ${currentPage === page && 'border-2 border-blue-700'}`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {showBigImage && (
        <div
          onClick={() => setShowBigImage('')}
          className='absolute h-full w-full bg-black/30 backdrop-blur-md z-50'
        >
          <div
            style={{ top: `${middlePx}px` }}
            className='fixed left-1/2 -translate-x-1/2 w-fit bg-neutral-100 p-4 pb-20 border rounded'
          >
            <img src={showBigImage} alt='Dog' className='h-96 w-96 border' />
          </div>
      </div>
      )}
    </div>
  );
};

export default List;
