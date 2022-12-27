import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useAuth } from '../../../contexts/auth';
import { firebaseAuth } from '../../../util/firebase';
import { B4hRoutes } from '../../../util/routes';

type LoginProps = {};

export function Login(props: LoginProps) {
  const { push, query } = useRouter();
  const { user } = useAuth();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(firebaseAuth);

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const handleOnLogin = async () => {
    try {
      await signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      console.error('fail to login', e);
    }

    await push(B4hRoutes.home);
  };

  if (user) {
    push(B4hRoutes.home);
    return <></>;
  }

  return (
    <>
      <h5>Login</h5>
      <br></br>
      <br></br>
      <>
        <label>email</label>
        <input ref={emailRef} type={'email'} />
      </>
      <br></br>
      <>
        <label>password</label>
        <input ref={passwordRef} type={'password'} />
      </>
      <br></br>
      <br></br>
      <button onClick={handleOnLogin}>Login</button>
    </>
  );
}
