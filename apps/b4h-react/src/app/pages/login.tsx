import { B4hButton, B4hInput } from '@b4h/web-components';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { B4hPageTitle } from '../components/pageTitle';
import { useB4hAuth } from '../providers/authProvider';
import { B4hRoutes } from '../shared/routes';

export const LoginPage = () => {
  const { login } = useB4hAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    setLoading(true);
    await login(email, password)
      .then(async () => {
        navigate(B4hRoutes.home);
      })
      .catch(err => {
        console.error('LoginPage', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <B4hPageTitle>home | login</B4hPageTitle>

      <h1>login</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <label htmlFor="email">email</label>
        <B4hInput type="text" id="email" name="email" />
        <label htmlFor="password">password</label>
        <B4hInput type="password" id="password" name="password" />
        <B4hButton type="submit" loading={loading}>
          Submit
        </B4hButton>
      </form>
    </>
  );
};
