import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SmallCloseIconStyle } from '../styles';

export interface UserMenuProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const UserMenu = ({ onClose, isOpen }: UserMenuProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
    onClose();
  };
  const handleRegister = () => {
    navigate('/register');
    onClose();
  };

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Flex justifyContent="space-between">
            <span>Basic Drawer</span>
            <Center>
              <SmallCloseIconStyle onClick={onClose} />
            </Center>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Flex justifyContent="center" flexDir="column" gap={2}>
            <Button type="submit" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="outline" onClick={handleRegister}>
              Register
            </Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
