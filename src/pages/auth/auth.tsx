import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { loginWithFacebook } from '../../services/auth';
import { Routes } from '../routes';

export const AuthPage = memo(() => {
  const [t] = useTranslation();
  const history = useHistory();

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleOnFacebook = useCallback(() => {
    setLoading(true);
    loginWithFacebook()
      .then(() => {
        setTimeout(() => history.push(Routes.home));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [history]);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <label className="m-3">Login or regiter by:</label>
        <button type="button" className="btn btn-primary btn-lg" onClick={handleOnFacebook}>
          {t('FACEBOOK')}
        </button>
      </div>
    </>
  );
});
