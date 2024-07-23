import { Box, Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { B4hRoutes } from '../config/routes';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();

  const handleRegister = () => {
    navigate(B4hRoutes.register);
  };
  const handleLogin = () => {
    navigate(B4hRoutes.login);
  };

  return (
    <Flex maxW="md" justifyContent="center" flexDir="column" m={3} gap={2}>
      <Heading as="h2" size="xl" noOfLines={1}>
        {t('register.title')}
      </Heading>
      <FormControl>
        <FormLabel>{t('register.email')}</FormLabel>
        <Input type="email" placeholder={t('register.emailPlaceholder')} />
      </FormControl>
      <FormControl>
        <FormLabel>{t('register.password')}</FormLabel>
        <Input type="password" placeholder={t('register.passwordPlaceholder')} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder={t('register.password2Placeholder')} />
      </FormControl>
      <Box p={3} />
      <Button onClick={handleRegister}>{t('register.submit')}</Button>
      <Button variant="outline" onClick={handleLogin}>
        {t('register.login')}
      </Button>
    </Flex>
  );
};
