'use client';

import { useB4hAuth } from '@/providers/authProvider';
import { B4hRoutes } from '@/shared/routes';
import { B4hButton, B4hInput } from '@b4h/web-components';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import styles from './page.module.scss';

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
    <form
      onSubmit={handleSubmit}
      // style={{ display: 'grid', gap: '8px', maxWidth: '500px' }}
      className={styles.container}
    >
      <label htmlFor="email">email</label>
      <B4hInput type="text" id="email" name="email" />
      <label htmlFor="password">password</label>
      <B4hInput type="password" id="password" name="password" />
      <B4hButton type="submit" loading={loading}>
        Submit
      </B4hButton>
    </form>
  );
}
