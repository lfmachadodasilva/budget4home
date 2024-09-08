import { B4hDropdown } from '@b4h/web-components';
import { ChangeEvent } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';

import { useB4hAuth } from '../../providers/authProvider';
import { B4hRoutes } from '../../shared/routes';

import { useTranslation } from 'react-i18next';
import styles from './header.module.scss';

export const B4hHeader = () => {
  const { user, logout } = useB4hAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case B4hRoutes.login:
        navigate(B4hRoutes.login);
        break;
      case B4hRoutes.logout:
        logout().finally(() => {
          navigate(B4hRoutes.login);
        });
        break;
      default:
        navigate(event.target.value);
        break;
    }
  };

  return (
    <div className={styles.container}>
      <B4hDropdown autoReset onChange={handleOnChange}>
        <GiHamburgerMenu size={24} />
        <option value={B4hRoutes.groups}>{t('groups.pageTitle')}</option>
        <option value={B4hRoutes.labels}>{t('labels.pageTitle')}</option>
        <option value={B4hRoutes.expenses}>{t('expenses.pageTitle')}</option>
      </B4hDropdown>
      <Link to={B4hRoutes.home}>
        <h3 className={styles.headerTxt}>budget4home</h3>
      </Link>
      {user ? (
        <B4hDropdown autoReset onChange={handleOnChange}>
          {user.photoURL ? (
            <img alt="avatar" className={styles.avatar} src={user?.photoURL} />
          ) : (
            <FaRegCircleUser size={24} />
          )}
          <option value={B4hRoutes.logout}>logout</option>
        </B4hDropdown>
      ) : (
        <B4hDropdown autoReset onChange={handleOnChange}>
          <FaRegCircleUser size={24} />
          <option value={B4hRoutes.login}>login</option>
          <option value={B4hRoutes.register}>register</option>
          <option value={B4hRoutes.forgot}>forgot password</option>
        </B4hDropdown>
      )}
    </div>
  );
};
