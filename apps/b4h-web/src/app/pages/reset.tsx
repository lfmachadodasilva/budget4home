import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { B4hForm } from '../../style/shared';
import { B4hRoutes } from '../config/routes';
import { ValidationLenght, ValidationRequired } from '../config/validations';
import { B4hPageLayout, B4hPageLayoutBanner } from '../layouts/pageBase';
import { LoginFormValues } from '../models/loginFormValues';
import { useAuth } from '../providers/authProvider';

export const ResetPage = () => {
  // #region hooks
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [t] = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginFormValues>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const alerts = useMemo(() => {
    const alerts: B4hPageLayoutBanner[] = [];
    error &&
      alerts.push({
        status: 'error',
        title: t('reset.error.title'),
        description: error
      });
    success &&
      alerts.push({
        status: 'success',
        description: success
      });

    return alerts.length > 0 ? alerts : null;
  }, [error, success, t]);
  // #endregion

  // #region handlers
  const handleReset = async (values: LoginFormValues) => {
    setError(null);
    setSuccess(null);
    try {
      await resetPassword(values.email);
      setSuccess(t('reset.success.description'));
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
  const handleLogin = () => navigate(B4hRoutes.login);
  // #endregion

  return (
    <B4hForm onSubmit={handleSubmit(handleReset)}>
      <B4hPageLayout title={t('reset.title')} alerts={alerts}>
        <slot slot="header">{t('reset.title')}</slot>
        <slot slot="body">
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>{t('reset.email')}</FormLabel>
            <Input
              type="email"
              id="email"
              placeholder={t('reset.emailPlaceholder')}
              {...register('email', {
                ...ValidationRequired(),
                ...ValidationLenght()
              })}
            />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <Box p={3} />
          <Button type="submit">{t('reset.submit')}</Button>
          <Button variant="outline" onClick={handleLogin}>
            {t('login.submit')}
          </Button>
        </slot>
      </B4hPageLayout>
    </B4hForm>
  );
};
