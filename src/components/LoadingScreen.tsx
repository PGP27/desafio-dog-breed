import { Dog } from 'phosphor-react';

const LoadingScreen = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='flex items-center'>
        <p className='text-2xl'>Carregando</p>
        <Dog className='ml-2 text-2xl animate-fast_ping' />
        <Dog className='ml-2 text-2xl animate-medium_ping' />
        <Dog className='ml-2 text-2xl animate-slow_ping' />
      </div>
    </div>
  );
};

export default LoadingScreen;
