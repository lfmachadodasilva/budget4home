import {
  Button,
  Link as ChakraLink,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { B4hForm } from '../../style/shared';
import { B4hRoutes } from '../config/routes';
import { B4hPageLayout, B4hPageLayoutError } from '../layouts/pageBase';
import { LoginFormValues } from '../models/loginFormValues';
import { useAuth } from '../providers/authProvider';

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>();
  const { login } = useAuth();
  const [t] = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: LoginFormValues) => {
    setError(null);
    try {
      await login(values.email, values.password);
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
  const handleRegister = () => {
    navigate(B4hRoutes.register);
  };

  const errorLayout = useMemo(
    () =>
      error
        ? ({
            title: t('login.error.title'),
            description: error
          } as B4hPageLayoutError)
        : null,
    [error, t]
  );

  return (
    <B4hForm onSubmit={handleSubmit(handleLogin)}>
      <B4hPageLayout title={t('login.title')} error={errorLayout}>
        <slot slot="header">{t('login.title')}</slot>
        <slot slot="body">
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>{t('login.email')}</FormLabel>
            <Input
              type="email"
              id="email"
              placeholder={t('login.emailPlaceholder')}
              {...register('email', {
                required: t('global.validation.required'),
                minLength: { value: 4, message: t('global.validation.minLength') }
              })}
            />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>{t('login.password')}</FormLabel>
            <Input
              type="password"
              id="password"
              placeholder={t('login.passwordPlaceholder')}
              {...register('password', {
                required: t('global.validation.required'),
                minLength: { value: 6, message: t('global.validation.minLength') }
              })}
            />
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
        </slot>
        <slot slot="actionBottom">
          <Button type="submit" isLoading={isSubmitting}>
            {t('login.submit')}
          </Button>
          <Button variant="outline" onClick={handleRegister}>
            {t('login.register')}
          </Button>
          <ChakraLink as={ReactRouterLink} to={B4hRoutes.reset}>
            {t('login.forgot')}
          </ChakraLink>
        </slot>
      </B4hPageLayout>
    </B4hForm>
  );
};
