import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
  const { user, loading, login } = useAuth();
  console.log('Login page', user, loading);

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
          Login
        </Heading>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="type your email here"
            {...register('email', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' }
            })}
          />
          <FormErrorMessage>
            <>{errors?.email?.message}</>
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            id="password"
            placeholder="do you remember me?"
            {...register('password', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' }
            })}
          />
          <FormErrorMessage>
            <>{errors?.password?.message}</>
          </FormErrorMessage>
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
        <Box p={3} />
        <Button type="submit" isLoading={isSubmitting}>
          Login
        </Button>
        <Button variant="outline" onClick={handleRegister}>
          Register
        </Button>
        <Link textAlign="center" href="reset">
          Forgot your passoword
        </Link>
      </Flex>
    </form>
  );
};
