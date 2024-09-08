import {
  B4hButton,
  B4hForm,
  B4hInput,
  B4hInputControl,
  B4hInputError,
  B4hInputLabel
} from '@b4h/web-components';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { B4hPageTitle } from '../../components/pageTitle';
import { useB4hAuth } from '../../providers/authProvider';

import { B4hRoutes } from '../../shared/routes';
import styles from './forgot.module.scss';

interface FormInput {
  email: string;
  password: string;
}

export const ForgotPage = () => {
  const { resetPassword } = useB4hAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormInput>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
    setError(null);
    resetPassword(data.email)
      .then(async () => {
        alert('check your email for reset instructions');
        navigate(B4hRoutes.login);
      })
      .catch(err => {
        setError(err.message);
        console.error('ForgotPage', err);
      })
      .finally(() => {});
  };

  return (
    <>
      <B4hPageTitle>reset password | budget4home</B4hPageTitle>

      <h1>login</h1>
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
        <B4hButton type="submit" loading={isSubmitting}>
          Submit
        </B4hButton>
        <B4hInputError>{error}</B4hInputError>
      </B4hForm>
    </>
  );
};
