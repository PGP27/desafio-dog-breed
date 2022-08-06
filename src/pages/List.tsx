import { useEffect, useState } from 'react';
import { api } from '~/services/index.service';
import { useAuth } from '~/contexts/AuthContext';
import LoadingScreen from '~/components/LoadingScreen';

const List = () => {
  const { token } = useAuth();
  const [breed, setBreed] = useState<string>('chihuahua');
  const [dogsList, setDogsList] = useState<string[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false);

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
    <div>
      <button type='button' onClick={() => setBreed('chihuahua')}>
        Chihuahua
      </button>
      <button type='button' onClick={() => setBreed('husky')}>
        Husky
      </button>
      <button type='button' onClick={() => setBreed('labrador')}>
        Labrador
      </button>
      <button type='button' onClick={() => setBreed('pug')}>
        Pug
      </button>
      {dogsList.map((image: string, index: number) => {
        return <img key={index} src={image} alt='' />;
      })}
    </div>
  );
};

export default List;
