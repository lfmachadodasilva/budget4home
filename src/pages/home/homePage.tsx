import { memo, useContext } from 'react';
import { ConfigContext } from '../../contexts/configContext';

export const HomePage = memo(() => {
  const config = useContext(ConfigContext);
  return (
    <>
      <p>
        build version: <strong>{config.buildVersion}</strong>
      </p>
      <p>
        api url:&nbsp;
        <strong>
          <a target="_blank" href={config.apiUrl + 'swagger'}>
            {config.apiUrl}
          </a>
        </strong>
      </p>
    </>
  );
});
