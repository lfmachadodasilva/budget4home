import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { B4hRoutes } from '../config/routes';
import { B4hDrawerLayout, B4hDrawerLayoutBaseProps } from '../layouts/drawer';
import { useAuth } from '../providers/authProvider';

interface UserMenuProps extends B4hDrawerLayoutBaseProps {}

export const UserMenu = ({ onClose, isOpen, onOpen }: UserMenuProps) => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const { isAuth, user, logout } = useAuth();

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
    <B4hDrawerLayout placement="right" onClose={onClose} isOpen={isOpen} onOpen={onOpen}>
      <slot slot="header" style={{ cursor: 'pointer' }}>
        {user && user.displayName}
        {!user && t('global.header.login')}
      </slot>
      <slot slot="body" style={{ cursor: 'pointer' }}>
        {!isAuth && (
          <>
            <Button type="submit" onClick={handleLogin}>
              {t('global.header.login')}
            </Button>
            <Button variant="outline" onClick={handleRegister}>
              {t('global.header.register')}
            </Button>
          </>
        )}
        {isAuth && (
          <>
            <Button variant="outline" onClick={handleLogout}>
              {t('global.header.logout')}
            </Button>
          </>
        )}
      </slot>
    </B4hDrawerLayout>
  );
};
