import {
  B4hButton,
  B4hInput,
  B4hInputErrorLabelControl,
  B4hInputLabelControl
} from '@b4h/web-components';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { B4hPageTitle } from '../../components/pageTitle';
import { useB4hAuth } from '../../providers/authProvider';
import { B4hRoutes } from '../../shared/routes';

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
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
    setError(null);
    login(data.email, data.password)
      .then(async () => {
        navigate(B4hRoutes.home);
      })
      .catch(err => {
        setError(err.message);
        console.error('LoginPage', err);
      })
      .finally(() => {});
  };

  return (
    <>
      <B4hPageTitle>home | login</B4hPageTitle>

      <h1>login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <B4hInputLabelControl htmlFor="email">email</B4hInputLabelControl>
        <B4hInput
          type="text"
          hasError={!!errors.email}
          {...register('email', { required: true, minLength: 4, maxLength: 50 })}
        />
        {errors.email && (
          <B4hInputErrorLabelControl>
            {errors.email.type === 'minLength' && 'min length is 4'}
            {errors.email.type === 'maxLength' && 'max length is 50'}
            {errors.email.type === 'required' && 'this field is required'}
          </B4hInputErrorLabelControl>
        )}
        <B4hInputLabelControl htmlFor="password">password</B4hInputLabelControl>
        <B4hInput
          type="password"
          hasError={!!errors.password}
          {...register('password', { required: true, minLength: 4, maxLength: 20 })}
        />
        {errors.password && (
          <B4hInputErrorLabelControl>
            {errors.password.type === 'minLength' && 'min length is 4'}
            {errors.password.type === 'maxLength' && 'max length is 20'}
            {errors.password.type === 'required' && 'this field is required'}
          </B4hInputErrorLabelControl>
        )}
        <B4hButton type="submit" loading={isSubmitting}>
          Submit
        </B4hButton>
        <B4hInputErrorLabelControl>{error}</B4hInputErrorLabelControl>
      </form>
    </>
  );
};
