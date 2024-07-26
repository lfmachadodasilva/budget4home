import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { B4hForm } from '../../style/shared';
import { B4hRoutes } from '../config/routes';
import { B4hPageLayout, B4hPageLayoutError } from '../layouts/pageBase';
import { LoginFormValues } from '../models/loginFormValues';
import { useAuth } from '../providers/authProvider';

interface RegisterFormValues extends LoginFormValues {
  password2: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: firebaseRegister } = useAuth();
  const [t] = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<RegisterFormValues>();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (values: RegisterFormValues) => {
    setError(null);
    try {
      await firebaseRegister(values.email, values.password);
      navigate(B4hRoutes.home);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
        console.error('FirebaseError', err.code, err.message);
      } else {
        setError(t('global.error'));
        console.error(err);
      }
    }
  };
  const handleLogin = () => {
    navigate(B4hRoutes.login);
  };

  const errorLayout = useMemo(
    () =>
      error
        ? ({
            title: t('register.error.title'),
            description: error
          } as B4hPageLayoutError)
        : null,
    [error, t]
  );

  return (
    <B4hForm onSubmit={handleSubmit(handleRegister)}>
      <B4hPageLayout title={t('register.title')} error={errorLayout}>
        <slot slot="header">{t('register.title')}</slot>
        <slot slot="body">
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>{t('register.email')}</FormLabel>
            <Input
              type="email"
              id="email"
              placeholder={t('register.emailPlaceholder')}
              {...register('email', {
                required: t('global.validation.required'),
                minLength: { value: 4, message: t('global.validation.minLength') }
              })}
            />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>{t('register.password')}</FormLabel>
            <Input
              type="password"
              id="password"
              placeholder={t('register.passwordPlaceholder')}
              {...register('password', {
                required: t('global.validation.required'),
                minLength: { value: 4, message: t('global.validation.minLength') }
              })}
            />
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password2}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              id="password2"
              placeholder={t('register.password2Placeholder')}
              {...register('password2', {
                required: t('global.validation.required'),
                minLength: { value: 4, message: t('global.validation.minLength') },
                validate: (value, form) => {
                  if (value === form.password) {
                    return true;
                  }
                  return t('global.validation.confirmPassword');
                }
              })}
            />
            <FormErrorMessage>{errors?.password2?.message}</FormErrorMessage>
          </FormControl>
        </slot>
        <slot slot="actionBottom">
          <Button type="submit">{t('register.submit')}</Button>
          <Button variant="outline" onClick={handleLogin}>
            {t('register.login')}
          </Button>
        </slot>
      </B4hPageLayout>
    </B4hForm>
  );
};
