import Logo from './Logo';

import { SignOut } from 'phosphor-react';

const Header = () => {
  const logout = () => {
    localStorage.clear();
    document.location.reload();
  };

  return (
    <header className='fixed w-full flex justify-between bg-white border-b shadow-sm py-1 p-2 z-50'>
      <Logo sm />
      <button
        title='Sair'
        className='p-2 rounded transition hover:bg-gray-100 hover:shadow-sm'
        onClick={logout}
      >
        <SignOut fontSize={20} />
      </button>
    </header>
  );
};

export default Header;
