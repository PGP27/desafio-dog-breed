import { useRef } from 'react';
import { useAuth } from '~/contexts/AuthContext';

const Register = () => {
  const { login } = useAuth();
  const emailRef = useRef<any>();
  console.log(emailRef);

  return (
    <div>
      <input
        ref={emailRef}
        onChange={({ target: { value } }) => (emailRef.current = value)}
        type='email'
      />
      <button onClick={() => login(emailRef.current)} type='button'>
        Entrar
      </button>
    </div>
  );
};

export default Register;
