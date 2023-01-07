'use client';

import { B4hButton, B4hForm, B4hInput } from '@budget4home/ui-components';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword
} from 'react-firebase-hooks/auth';
import { useAuth } from '../../contexts/auth';
import { firebaseAuth } from '../../util/firebase';
import { B4hRoutes } from '../../util/routes';

export default function () {
  const { user } = useAuth();
  const { push } = useRouter();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(firebaseAuth);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(firebaseAuth);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(firebaseAuth);

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const handleOnLogin = () => {
    if (!emailRef.current.value || !passwordRef.current.value) {
      alert('Missing email ✉️ or password 🔑');
      return;
    }

    signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value).then(() => {
      push(B4hRoutes.home);
    });
  };

  const handleOnRegister = () => {
    if (!emailRef.current.value || !passwordRef.current.value) {
      alert('Missing email ✉️ or password 🔑');
      return;
    }

    createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value).then(() => {
      push(B4hRoutes.home);
    });
  };

  const handleOnForgotPassword = async () => {
    if (!emailRef.current.value) {
      alert('Missing email ✉️');
      return;
    }

    await sendPasswordResetEmail(emailRef.current.value);
    alert('Check your email ✉️');
  };

  if (user) {
    return <h3>Welcome {user.displayName ?? user.email}</h3>;
  }

  return (
    <B4hForm
      label="Login"
      footer={[
        <B4hButton key="login" type="button" onClick={handleOnLogin}>
          login
        </B4hButton>,
        <B4hButton key="register" type="button" onClick={handleOnRegister}>
          register
        </B4hButton>,
        <B4hButton key="forgot" type="button" onClick={handleOnForgotPassword}>
          forgot password
        </B4hButton>
      ]}
    >
      <B4hInput id="email" ref={emailRef} type={'email'} label={'email'} />
      <B4hInput id="password" ref={passwordRef} type={'password'} label={'password'} />
    </B4hForm>
  );
}
