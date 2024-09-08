import { B4hButton, B4hInput } from '@b4h/web-components';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { B4hPageTitle } from '../../components/pageTitle';
import { useB4hAuth } from '../../providers/authProvider';

interface FormInput {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const { login } = useB4hAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormInput>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const email = event.currentTarget.email.value;
  //   const password = event.currentTarget.password.value;

  //   setLoading(true);
  //   await login(email, password)
  //     .then(async () => {
  //       navigate(B4hRoutes.home);
  //     })
  //     .catch(err => {
  //       console.error('LoginPage', err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const onSubmit: SubmitHandler<FormInput> = data => console.log(data);

  return (
    <>
      <B4hPageTitle>home | login</B4hPageTitle>

      <h1>login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <label htmlFor="email">email</label>
        <B4hInput
          type="text"
          id="email"
          {...(register('email'), { required: true, minLength: 4, maxLength: 50 })}
        />
        {errors.email && (
          <caption aria-live="polite">{errors.email && 'email is required'}</caption>
        )}
        <label htmlFor="password">password</label>
        <B4hInput
          type="password"
          id="password"
          {...register('password', { required: true, minLength: 4, maxLength: 20 })}
        />
        {errors.password && (
          <caption aria-live="polite">{errors.password && 'password is required'}</caption>
        )}
        <B4hButton type="submit" loading={loading}>
          Submit
        </B4hButton>
      </form>
    </>
  );
};
