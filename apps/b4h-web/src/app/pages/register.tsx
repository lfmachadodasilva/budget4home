import { Box, Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Flex maxW="md" justifyContent="center" flexDir="column" m={3} gap={2}>
      <Heading as="h2" size="xl" noOfLines={1}>
        Register
      </Heading>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" placeholder="type your email here" />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        {/* <FormErrorMessage>Test</FormErrorMessage> */}
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="type your new password here" />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="one more time" />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
      <Box p={3} />
      <Button onClick={handleRegister}>Register</Button>
      <Button variant="outline" onClick={handleLogin}>
        Login
      </Button>
    </Flex>
  );
};
