'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { B4hRoutes } from '../../../config/routes';
import { useB4hAuth } from '../../../providers/authProvider';

export default function LoginPage() {
  const { login } = useB4hAuth();
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('submit', {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value
    });

    console.log('login1');
    await login(event.currentTarget.email.value, event.currentTarget.password.value).then(() => {
      push(B4hRoutes.home);
    });
    console.log('login2');
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
