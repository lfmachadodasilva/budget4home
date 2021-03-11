import { FC, memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../pages/routes';

export type HeaderProps = {};

export const HeaderComponent: FC<HeaderProps> = memo((props: HeaderProps) => {
  const history = useHistory();

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/#">
            budget4home
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
                Group
              </a>
              <a className="nav-link" style={{ cursor: 'pointer' }} onClick={() => handleRedirectTo(Routes.label)}>
                Label
              </a>
              <a className="nav-link" style={{ cursor: 'pointer' }} onClick={() => handleRedirectTo(Routes.expense)}>
                Expense
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});
