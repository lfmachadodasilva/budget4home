import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { defaultLanguage, getOptions } from './settings';

const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(async (language: string, namespace: string) => {
        const basePromise = import(`./locales/${language}/base.json`);
        const extensionPromise =
          namespace !== 'base'
            ? import(`./locales/${language}/${namespace}.json`)
            : Promise.resolve({});
        const [base, extension] = await Promise.all([basePromise, extensionPromise]);
        return { ...base, ...extension };
      })
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation(
  namespace: string,
  language: string = defaultLanguage,
  options: any = {}
): Promise<{
  t: (key: string | string[], options?: any) => string;
  i18n: any;
}> {
  const i18nextInstance = await initI18next(language, namespace);
  return {
    // @ts-ignore
    t: i18nextInstance.getFixedT(
      language,
      Array.isArray(namespace) ? namespace[0] : namespace,
      options.keyPrefix
    ),
    i18n: i18nextInstance
  };
}
