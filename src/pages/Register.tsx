import { useEffect, useRef } from 'react';

import { useAuth } from '~/contexts/AuthContext';

import Logo from '~/components/Logo';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import dogLogin from '~/assets/dog-login.png';

const Register = () => {
  const { login, loadingLogin, erro, setErro } = useAuth();
  const emailRef = useRef<any>();

  useEffect(() => {
    if (erro) {
      toast.error('Email inválido!', {
        type: 'error',
        closeButton: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      setTimeout(() => setErro(false), 6000);
    }
  }, [erro, setErro]);

  return (
    <div className='w-screen h-screen flex justify-center'>
      <div className='hidden h-full flex-1 lg:flex flex-col items-end justify-end'>
        <img src={dogLogin} alt='Boxer' className='block' />
      </div>
      <div className='h-full lg:flex-1 flex flex-col justify-center'>
        <div className='flex flex-col max-w-[400px]'>
          <Logo />
          <p className='mt-4 text-gray-600'>Insira seu email para entrar</p>
          <div className='flex flex-col my-12'>
            <label htmlFor='input-email' className='mb-2'>
              Email
            </label>
            <input
              id='input-email'
              ref={emailRef}
              onChange={({ target: { value } }) => (emailRef.current = value)}
              type='email'
              placeholder='Digite seu melhor email'
              className='py-2 px-4 bg-gray-200 rounded outline-none text-lg focus:bg-gray-100'
            />
          </div>
          <button
            type='button'
            onClick={() => login(emailRef.current)}
            disabled={loadingLogin}
            className='py-2 px-4 text-lg rounded bg-green-600 text-white transition hover:opacity-90 hover:shadow disabled:cursor-not-allowed'
          >
            {loadingLogin ? (
              <div className='flex items-center justify-center'>
                <p>Carregando</p>
                <div className='ml-4 h-4 w-4 rounded-full border-2 border-b-0 border-l-0 border-white animate-spin' />
              </div>
            ) : (
              'Entrar'
            )}
          </button>
        </div>
      </div>
      {erro && <ToastContainer />}
    </div>
  );
};

export default Register;
