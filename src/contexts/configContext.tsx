import { createContext, memo, PropsWithChildren } from 'react';
import axios from 'axios';

import { ConfigModel, defaultConfigModel } from '../models/configModel';
import { WakeServerComponent } from '../components/wakeServer/wakeServer';

export const ConfigContext = createContext<ConfigModel>(defaultConfigModel);

export const ConfigContextProvider = memo((props: PropsWithChildren<unknown>) => {
  const apiUrl = process.env.REACT_APP_API_URL || defaultConfigModel.apiUrl;
  const buildVersion = process.env.REACT_APP_BUILD_VERSION || defaultConfigModel.buildVersion;

  axios.defaults.baseURL = apiUrl;

  return (
    <ConfigContext.Provider value={{ ...defaultConfigModel, apiUrl, buildVersion }}>
      <WakeServerComponent>{props.children}</WakeServerComponent>
    </ConfigContext.Provider>
  );
});
