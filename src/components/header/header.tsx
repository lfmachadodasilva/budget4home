import firebase from 'firebase';
import { FC, memo, useCallback, useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { getUserDisplayName } from '../../helpers/userHelper';
import { Routes } from '../../pages/routes';
import { signOut } from '../../services/authService';

export type HeaderProps = {};

export const HeaderComponent: FC<HeaderProps> = memo((props: HeaderProps) => {
  const [user, initialising] = useAuthState(firebase.auth());

  const history = useHistory();
  const [t] = useTranslation();

  const handleRedirectTo = useCallback(
    (path: string) => {
      const pathName = user && !initialising ? path : path === Routes.home ? Routes.home : Routes.auth;
      if (history.location.search) {
        history.push({ pathname: pathName, search: history.location.search });
      } else {
        history.push(pathName);
      }
    },
    [history, user, initialising]
  );

  const handleOnLogin = useCallback(() => {
    handleRedirectTo(Routes.auth);
  }, [handleRedirectTo]);
  const handleOnLogout = useCallback(() => {
    signOut().then(() => {
      handleRedirectTo(Routes.home);
    });
  }, [handleRedirectTo]);

  const authElement = useMemo(() => {
    if (user && !initialising) {
      return (
        <div className="btn-group" role="group">
          <button
            id="btnGroupDrop1"
            type="button"
            className="btn btn-primary dropdown-toggle btn-sm pt-0 pb-0"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {getUserDisplayName(user)}
          </button>
          <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <li>
              <a className="dropdown-item" onClick={() => handleRedirectTo(Routes.import)}>
                {t('IMPORT')}
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={() => handleRedirectTo(Routes.export)}>
                {t('EXPORT')}
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" onClick={handleOnLogout}>
                {t('LOGOUT')}
              </a>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <button type="button" className="btn btn-primary btn-sm pt-0 pb-0" onClick={handleOnLogin}>
        {t('LOGIN')}
      </button>
    );
  }, [user, initialising, t, handleOnLogin, handleRedirectTo, handleOnLogout]);

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-2">
        <div className="container">
          <a className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => handleRedirectTo(Routes.home)}>
            {t('TITLE')}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" style={{ cursor: 'pointer' }} onClick={() => handleRedirectTo(Routes.group)}>
                {t('GROUP')}
              </a>
              <a className="nav-link" style={{ cursor: 'pointer' }} onClick={() => handleRedirectTo(Routes.label)}>
                {t('LABEL')}
              </a>
              <a className="nav-link" style={{ cursor: 'pointer' }} onClick={() => handleRedirectTo(Routes.expense)}>
                {t('EXPENSE')}
              </a>
            </div>
            {authElement}
          </div>
        </div>
      </nav>
    </>
  );
});
