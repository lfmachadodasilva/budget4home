'use client';

import { useB4hAuth } from '@/providers/authProvider';
import { B4hRoutes } from '@/shared/routes';
import { B4hButton, B4hInput } from '@b4h/web-components';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import styles from './page.module.scss';

export default function RegisterPageClient() {
  const { register } = useB4hAuth();
  const { push, refresh } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.currentTarget.password1.value === event.currentTarget.password2.value) {
      setLoading(true);
      await register(event.currentTarget.email.value, event.currentTarget.password1.value)
        .then(async () => {
          push(B4hRoutes.home);
          refresh();
        })
        .catch(err => {
          console.error('RegisterPageClient', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <h1>register</h1>
      <form onSubmit={handleSubmit} className={styles.container}>
        <label htmlFor="email">email</label>
        <B4hInput type="text" id="email" name="email" />
        <label htmlFor="password1">password</label>
        <B4hInput type="password" id="password1" name="password1" />
        <label htmlFor="password2">confirm password</label>
        <B4hInput type="password" id="password2" name="password2" />
        <B4hButton type="submit" loading={loading}>
          Submit
        </B4hButton>
      </form>
    </>
  );
}
