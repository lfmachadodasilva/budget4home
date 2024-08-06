'use client';

import { B4hRoutes } from '@/config/routes';
import { useB4hAuth } from '@/providers/authProvider';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function LoginPage() {
  const { login } = useB4hAuth();
  const { push, refresh } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login(event.currentTarget.email.value, event.currentTarget.password.value)
        .then(async () => {
          push(B4hRoutes.home);
          refresh();
        })
        .catch(err => {
          console.error('LoginPage', err);
        });
    } catch (err) {
      console.error('LoginPage', err);
    }
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
