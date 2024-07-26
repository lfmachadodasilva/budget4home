import {
  Button,
  Link as ChakraLink,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { B4hForm } from '../../style/shared';
import { B4hRoutes } from '../config/routes';
import { B4hPageTemplate } from '../layouts/pageBase';
import { useAuth } from '../providers/authProvider';

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>();
  const { login } = useAuth();
  const [t] = useTranslation();

  const handleLogin = async (values: LoginFormValues) => {
    await login(values.email, values.password);
    navigate(B4hRoutes.home);
  };
  const handleRegister = () => {
    navigate(B4hRoutes.register);
  };

  return (
    <B4hForm onSubmit={handleSubmit(handleLogin)}>
      <B4hPageTemplate>
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
                minLength: { value: 4, message: t('global.validation.minLength') }
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
      </B4hPageTemplate>
    </B4hForm>
  );
};
