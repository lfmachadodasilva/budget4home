import { createContext, memo, PropsWithChildren } from 'react';
import { ConfigModel, defaultConfigModel } from '../models/configModel';

export const ConfigContext = createContext<ConfigModel>(defaultConfigModel);

export const ConfigContextProvider = memo((props: PropsWithChildren<unknown>) => {
  const apiUrl = process.env.REACT_APP_API_URL || defaultConfigModel.apiUrl;
  const buildVersion = process.env.REACT_APP_BUILD_VERSION || defaultConfigModel.buildVersion;

  return (
    <ConfigContext.Provider value={{ ...defaultConfigModel, apiUrl, buildVersion }}>
      {props.children}
    </ConfigContext.Provider>
  );
});
