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

import styles from './register.module.scss';

interface FormInput {
  email: string;
  password1: string;
  password2: string;
}

export const RegisterPage = () => {
  const { register: authRegister } = useB4hAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues
  } = useForm<FormInput>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
    setError(null);
    authRegister(data.email, data.password1)
      .then(async () => {
        navigate(B4hRoutes.login);
      })
      .catch(err => {
        setError(err.message);
        console.error('RegisterPage', err);
      })
      .finally(() => {});
  };

  console.log(errors, getValues('password1'));

  return (
    <>
      <B4hPageTitle>register | budget4home</B4hPageTitle>

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
        <B4hInputControl>
          <B4hInputLabel htmlFor="password2">password</B4hInputLabel>
          <B4hInput
            type="password"
            hasError={!!errors.password1}
            {...register('password1', { required: true, minLength: 4, maxLength: 20 })}
          />
          {errors.password1 && (
            <B4hInputError>
              {errors.password1.type === 'minLength' && 'min length is 4'}
              {errors.password1.type === 'maxLength' && 'max length is 20'}
              {errors.password1.type === 'required' && 'this field is required'}
            </B4hInputError>
          )}
        </B4hInputControl>
        <B4hInputControl>
          <B4hInputLabel htmlFor="password2">password</B4hInputLabel>
          <B4hInput
            type="password"
            hasError={!!errors.password2}
            {...register('password2', {
              required: true,
              minLength: 4,
              maxLength: 20,
              validate: value => value === getValues('password1') || 'passwords must match'
            })}
          />
          {errors.password2 && (
            <B4hInputError>
              {errors.password2.type === 'minLength' && 'min length is 4'}
              {errors.password2.type === 'maxLength' && 'max length is 20'}
              {errors.password2.type === 'required' && 'this field is required'}
              {errors.password2.type === 'validate' && errors.password2.message}
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
