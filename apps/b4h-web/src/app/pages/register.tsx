import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { B4hForm } from '../../style/shared';
import { B4hRoutes } from '../config/routes';
import { ValidationLenght, ValidationRequired } from '../config/validations';
import { B4hPageLayout, B4hPageLayoutBanner } from '../layouts/page';
import { LoginFormValues } from '../models/loginFormValues';
import { useAuth } from '../providers/authProvider';

interface RegisterFormValues extends LoginFormValues {
  password2: string;
}

export const RegisterPage = () => {
  // #region hooks
  const navigate = useNavigate();
  const { register: firebaseRegister } = useAuth();
  const [t] = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<RegisterFormValues>();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const alerts = useMemo(
    () =>
      error
        ? [
            {
              status: 'error',
              title: t('register.error.title'),
              description: error
            } as B4hPageLayoutBanner
          ]
        : null,
    [error, t]
  );
  // #endregion

  // #region handlers
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
  const handleLogin = () => navigate(B4hRoutes.login);
  const handleShowPassword = () => setShowPassword(show => !show);
  // #endregion

  return (
    <B4hForm onSubmit={handleSubmit(handleRegister)}>
      <B4hPageLayout title={t('register.title')} alerts={alerts}>
        <slot slot="header">{t('register.title')}</slot>
        <slot slot="body">
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>{t('register.email')}</FormLabel>
            <Input
              type="email"
              id="email"
              placeholder={t('register.emailPlaceholder')}
              {...register('email', {
                ...ValidationRequired(),
                ...ValidationLenght()
              })}
            />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>{t('register.password')}</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder={t('register.passwordPlaceholder')}
                {...register('password', {
                  ...ValidationRequired(),
                  ...ValidationLenght()
                })}
              />
              <InputRightElement width="2.5rem" style={{ cursor: 'pointer' }}>
                {!showPassword && <FaEye onClick={handleShowPassword} />}
                {showPassword && <FaEyeSlash onClick={handleShowPassword} />}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password2}>
            <FormLabel>{t('register.password2')}</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password2"
                placeholder={t('register.password2Placeholder')}
                {...register('password2', {
                  ...ValidationRequired(),
                  ...ValidationLenght(),
                  validate: (value, form) => {
                    if (value === form.password) {
                      return true;
                    }
                    return t('global.validation.confirmPassword');
                  }
                })}
              />
              <InputRightElement width="2.5rem" style={{ cursor: 'pointer' }}>
                {!showPassword && <FaEye onClick={handleShowPassword} />}
                {showPassword && <FaEyeSlash onClick={handleShowPassword} />}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors?.password2?.message}</FormErrorMessage>
          </FormControl>
        </slot>
        <slot slot="actionBottom">
          <Button type="submit">{t('register.submit')}</Button>
          <Button variant="outline" onClick={handleLogin}>
            {t('login.title')}
          </Button>
        </slot>
      </B4hPageLayout>
    </B4hForm>
  );
};
