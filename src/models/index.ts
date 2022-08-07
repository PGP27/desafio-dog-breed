import { Dispatch, ReactNode, SetStateAction } from 'react';

export type DogBreed = 'chihuahua' | 'husky' | 'labrador' | 'pug';

export interface AuthContextProps {
  loadingLogin: boolean;
  token: string;
  login(email: string): Promise<void>;
  erro: boolean;
  setErro: Dispatch<SetStateAction<boolean>>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

interface DogCardProps {
  title: string;
  image: string;
  text: string;
  selected?: boolean;
}

export type DogCardModel = DogCardProps & JSX.IntrinsicElements['button'];

export interface LogoProps {
  sm?: boolean;
}

export interface BreedOptionsProps {
  breed: DogBreed;
  setBreed: Dispatch<React.SetStateAction<DogBreed>>;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
}

export interface PhotosNumberProps {
  setMaxPhotos: Dispatch<React.SetStateAction<number>>;
}

export interface DogsListProps {
  dogsList: string[];
  maxPhotos: number;
  currentPage: number;
  setShowBigImage: Dispatch<React.SetStateAction<string>>;
}

export interface PaginationProps {
  pagesArray: number[];
  currentPage: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
}
