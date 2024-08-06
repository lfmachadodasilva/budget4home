'use client';

import { B4hRoutes } from '@/config/routes';
import { useB4hAuth } from '@/providers/authProvider';
import { getFirebaseAnalytics, logEvent } from '@b4h/firebase';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect } from 'react';

export default function LoginPage() {
  const { login } = useB4hAuth();
  const { push, refresh } = useRouter();

  useEffect(() => {
    logEvent(getFirebaseAnalytics(), 'login');
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await login(event.currentTarget.email.value, event.currentTarget.password.value)
      .then(async () => {
        refresh();
        push(B4hRoutes.home);
      })
      .catch(err => {
        console.error('LoginPage', err);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '8px', maxWidth: '500px' }}>
      <label htmlFor="email">email</label>
      <input style={{ border: '1px solid black' }} type="text" id="email" name="email" />
      <label htmlFor="password">password</label>
      <input style={{ border: '1px solid black' }} type="password" id="password" name="password" />
      <button style={{ border: '1px solid black' }} type="submit">
        Submit
      </button>
    </form>
  );
}
