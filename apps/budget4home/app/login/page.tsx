'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useAuth } from '../../contexts/auth';
import { firebaseAuth } from '../../util/firebase';

export default function () {
  const { user } = useAuth();
  const { push } = useRouter();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(firebaseAuth);

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const handleOnLogin = () => {
    // try {
    //   await signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
    // } catch (e) {
    //   console.error('fail to login', e);
    // }
    signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value).then(() => {
      // push(B4hRoutes.home);
    });
  };

  // if (user) {
  //   replace(B4hRoutes.home);
  //   // return <></>;
  // }

  if (user) {
    return <h3>Welcome {user.displayName ?? user.email}</h3>;
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
