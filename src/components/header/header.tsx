import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../pages/routes';

export type HeaderProps = {};

export const HeaderComponent: FC<HeaderProps> = memo((props: HeaderProps) => {
  const history = useHistory();
  const [t] = useTranslation();

  const handleRedirectTo = useCallback(
    (path: string) => {
      if (history.location.search) {
        history.push({ pathname: path, search: history.location.search });
      } else {
        history.push(path);
      }
    },
    [history]
  );

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-2">
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
          </div>
        </div>
      </nav>
    </>
  );
});
