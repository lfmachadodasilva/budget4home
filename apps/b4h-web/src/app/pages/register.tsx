import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { B4hRoutes } from '../config/routes';
import { B4hPageTemplate } from '../layouts/pageBase';

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
    <B4hPageTemplate>
      <slot slot="header">{t('register.title')}</slot>
      <slot slot="body">
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
      </slot>
      <slot slot="actionBottom">
        <Button onClick={handleRegister}>{t('register.submit')}</Button>
        <Button variant="outline" onClick={handleLogin}>
          {t('register.login')}
        </Button>
      </slot>
    </B4hPageTemplate>
  );
};
