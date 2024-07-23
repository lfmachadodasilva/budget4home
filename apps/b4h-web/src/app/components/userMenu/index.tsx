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
import { useAuth } from '../../config/firebase/authProvider';
import { B4hRoutes } from '../../config/routes';
import { SmallCloseIconStyle } from '../styles';

export interface UserMenuProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const UserMenu = ({ onClose, isOpen }: UserMenuProps) => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  console.log('UserMenu', { user, loading });

  const handleLogin = () => {
    navigate(B4hRoutes.login);
    onClose();
  };
  const handleRegister = () => {
    navigate(B4hRoutes.register);
    onClose();
  };
  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Flex justifyContent="space-between">
            {user && <span>{user.displayName}</span>}
            {!user && <span>Login</span>}
            <Center>
              <SmallCloseIconStyle onClick={onClose} />
            </Center>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Flex justifyContent="center" flexDir="column" gap={2}>
            {!user && (
              <>
                <Button type="submit" onClick={handleLogin}>
                  Login
                </Button>
                <Button variant="outline" onClick={handleRegister}>
                  Register
                </Button>
              </>
            )}
            {user && (
              <>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
