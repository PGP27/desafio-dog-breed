import { PawPrint } from 'phosphor-react'

interface LogoProps {
  sm?: boolean;
}

const Logo = ({ sm }: LogoProps) => (
  <div className='flex items-center'>
    <h1 className={`${sm ? 'text-lg' : 'text-4xl'}`}>Dog Breed</h1>
    <PawPrint fontSize={sm ? 20 : 36} className='ml-2' />
  </div>
);

export default Logo;
