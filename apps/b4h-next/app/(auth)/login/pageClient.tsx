'use client';

import { useB4hAuth } from '@/providers/authProvider';
import { B4hRoutes } from '@/shared/routes';
import { B4hButton } from '@b4h/web-components';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPageClient() {
  const { login } = useB4hAuth();
  const { push, refresh } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    await login(event.currentTarget.email.value, event.currentTarget.password.value)
      .then(async () => {
        push(B4hRoutes.home);
        refresh();
      })
      .catch(err => {
        console.error('LoginPage', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '8px', maxWidth: '500px' }}>
      <label htmlFor="email">email</label>
      <input type="text" id="email" name="email" />
      <label htmlFor="password">password</label>
      <input type="password" id="password" name="password" />
      <B4hButton type="submit" loading={loading}>
        Submit
      </B4hButton>
    </form>
  );
}
