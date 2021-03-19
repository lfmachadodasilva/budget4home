import { memo, PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { ConfigContext } from '../../contexts/configContext';
import { useTranslation } from 'react-i18next';

export const WakeServerComponent = memo((props: PropsWithChildren<unknown>) => {
  const [t] = useTranslation();
  const { apiUrl } = useContext(ConfigContext);

  const [isLoading, setLoading] = useState(true);
  const [tryAgain, setTryAgain] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  // default loading is a empty html tag
  const [loadingElement, setLoadingElement] = useState(<></>);

  useEffect(() => {
    if (apiUrl.length === 0) {
      console.error('Missing api url');
      return;
    }

    const runAsync = async () => {
      try {
        const response = await axios.get('/api/ready', {
          baseURL: apiUrl
        });
        if (response.status === 200) {
          setLoading(false);
        } else {
          setFirstLoad(false);
          setTryAgain(!tryAgain);
        }
      } catch (err) {
        setFirstLoad(false);
        setTryAgain(!tryAgain);
      }
    };

    if (isLoading) {
      if (firstLoad) {
        runAsync();
      } else {
        // is not the first time - wait 2s to check again if the server is up
        setTimeout(() => runAsync(), 2000);
      }

      // set timer to show the loading after a second
      // this will avoid every refresh to show the loading unnecessarily
      setTimeout(() => {
        setLoadingElement(
          <>
            <div className="d-flex justify-content-center m-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <p>{t('WAKE_SERVER')}</p>
            </div>
          </>
        );
      }, 1000);
    }
  }, [apiUrl, firstLoad, tryAgain, isLoading, t]);

  return <>{isLoading ? loadingElement : props.children}</>;
});
