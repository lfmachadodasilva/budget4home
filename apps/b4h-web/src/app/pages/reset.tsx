import { Box, Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { B4hRoutes } from '../config/routes';

export const ResetPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    // TODO
  };
  const handleLogin = () => {
    navigate(B4hRoutes.login);
  };

  return (
    <Flex maxW="md" justifyContent="center" flexDir="column" m={3} gap={2}>
      <Heading as="h2" size="xl" noOfLines={1}>
        Reset your password
      </Heading>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" placeholder="type your email here" />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        {/* <FormErrorMessage>Test</FormErrorMessage> */}
      </FormControl>
      <Box p={3} />
      <Button onClick={handleRegister}>Reset my password</Button>
      <Button variant="outline" onClick={handleLogin}>
        Login
      </Button>
    </Flex>
  );
};
