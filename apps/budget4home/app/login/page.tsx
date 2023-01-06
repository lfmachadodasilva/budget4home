'use client';

import { B4hButton, B4hForm, B4hInput } from '@budget4home/ui-components';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useAuth } from '../../contexts/auth';
import { firebaseAuth } from '../../util/firebase';
import { B4hRoutes } from '../../util/routes';

export default function () {
  const { user } = useAuth();
  const { push } = useRouter();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(firebaseAuth);

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const handleOnLogin = () => {
    signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value).then(() => {
      push(B4hRoutes.home);
    });
  };

  if (user) {
    return <h3>Welcome {user.displayName ?? user.email}</h3>;
  }

  return (
    <B4hForm
      label="Login"
      footer={
        <B4hButton type="button" onClick={handleOnLogin}>
          Login
        </B4hButton>
      }
    >
      <B4hInput id="email" ref={emailRef} type={'email'} label={'email'} />
      <B4hInput id="password" ref={passwordRef} type={'password'} label={'password'} />
    </B4hForm>
  );
}
