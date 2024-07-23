import {
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../config/firebase/authProvider';
import { B4hRoutes } from '../config/routes';

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
    <form onSubmit={handleSubmit(handleLogin)}>
      <Flex maxW="md" justifyContent="center" flexDir="column" m={3} gap={2}>
        <Heading as="h2" size="xl" noOfLines={1}>
          {t('login.title')}
        </Heading>

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
          <FormErrorMessage>
            <>{errors?.email?.message}</>
          </FormErrorMessage>
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
          <FormErrorMessage>
            <>{errors?.password?.message}</>
          </FormErrorMessage>
        </FormControl>
        <Box p={3} />
        <Button type="submit" isLoading={isSubmitting}>
          {t('login.submit')}
        </Button>
        <Button variant="outline" onClick={handleRegister}>
          {t('login.register')}
        </Button>
        <ChakraLink as={ReactRouterLink} to={B4hRoutes.reset}>
          {t('login.forgot')}
        </ChakraLink>
      </Flex>
    </form>
  );
};
