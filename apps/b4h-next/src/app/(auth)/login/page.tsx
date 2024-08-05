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

    await login(event.currentTarget.email.value, event.currentTarget.password.value).then(
      async () => {
        refresh();
        push(B4hRoutes.home);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '8px', maxWidth: '500px' }}>
      <label>email</label>
      <input type="text" id="email" name="email" />
      <label>password</label>
      <input type="password" id="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
