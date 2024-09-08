import {
  B4hButton,
  B4hForm,
  B4hFormActions,
  B4hInput,
  B4hInputControl,
  B4hInputError,
  B4hInputLabel,
  B4hPageLayout,
  B4hPageLayoutTitle
} from '@b4h/web-components';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { B4hPageTitle } from '../../components/pageTitle';
import { useB4hAuth } from '../../providers/authProvider';
import { B4hRoutes } from '../../shared/routes';

import styles from './login.module.scss';

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
      <B4hPageTitle>login | budget4home</B4hPageTitle>
      <B4hPageLayout>
        <B4hPageLayoutTitle>login</B4hPageLayoutTitle>
        <B4hForm onSubmit={handleSubmit(onSubmit)} className={styles.container}>
          <B4hInputControl>
            <B4hInputLabel htmlFor="email">email</B4hInputLabel>
            <B4hInput
              type="text"
              hasError={!!errors.email}
              {...register('email', { required: true, minLength: 4, maxLength: 50 })}
            />
            {errors.email && (
              <B4hInputError>
                {errors.email.type === 'minLength' && 'min length is 4'}
                {errors.email.type === 'maxLength' && 'max length is 50'}
                {errors.email.type === 'required' && 'this field is required'}
              </B4hInputError>
            )}
          </B4hInputControl>
          <B4hInputControl>
            <B4hInputLabel htmlFor="password">password</B4hInputLabel>
            <B4hInput
              type="password"
              hasError={!!errors.password}
              {...register('password', { required: true, minLength: 4, maxLength: 20 })}
            />
            {errors.password && (
              <B4hInputError>
                {errors.password.type === 'minLength' && 'min length is 4'}
                {errors.password.type === 'maxLength' && 'max length is 20'}
                {errors.password.type === 'required' && 'this field is required'}
              </B4hInputError>
            )}
          </B4hInputControl>
          <B4hFormActions>
            <B4hButton type="submit" loading={isSubmitting}>
              Submit
            </B4hButton>
          </B4hFormActions>
          <B4hInputError>{error}</B4hInputError>
        </B4hForm>
      </B4hPageLayout>
    </>
  );
};
