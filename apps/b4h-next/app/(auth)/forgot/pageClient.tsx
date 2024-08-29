'use client';

import { useB4hAuth } from '@/providers/authProvider';
import { B4hRoutes } from '@/shared/routes';
import { B4hButton, B4hInput } from '@b4h/web-components';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import styles from './page.module.scss';

export default function ForgotPageClient() {
  const { resetPassword } = useB4hAuth();
  const { push, refresh } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    await resetPassword(event.currentTarget.email.value)
      .then(async () => {
        push(B4hRoutes.login);
      })
      .catch(err => {
        console.error('ForgotPageClient', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <h1>forgot password</h1>
      <form onSubmit={handleSubmit} className={styles.container}>
        <label htmlFor="email">email</label>
        <B4hInput type="text" id="email" name="email" />
        <B4hButton type="submit" loading={loading}>
          Submit
        </B4hButton>
      </form>
    </>
  );
}
