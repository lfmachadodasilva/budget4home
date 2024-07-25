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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { B4hRoutes } from '../../config/routes';
import { useAuth } from '../../providers/authProvider';
import { SmallCloseIconStyle } from '../styles';

export interface UserMenuProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const UserMenu = ({ onClose, isOpen }: UserMenuProps) => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const { user, loading, logout } = useAuth();

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
            {!user && <span>{t('global.header.login')}</span>}
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
                  {t('global.header.login')}
                </Button>
                <Button variant="outline" onClick={handleRegister}>
                  {t('global.header.register')}
                </Button>
              </>
            )}
            {user && (
              <>
                <Button variant="outline" onClick={handleLogout}>
                  {t('global.header.logout')}
                </Button>
              </>
            )}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
