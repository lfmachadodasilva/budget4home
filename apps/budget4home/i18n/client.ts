'use client';

import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import { defaultLanguage, getOptions } from './settings';

i18next
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
  .init(getOptions());

export function useTranslation(
  namespace: string,
  language: string = defaultLanguage,
  options: any = {}
) {
  if (i18next.resolvedLanguage !== language) i18next.changeLanguage(language);
  return useTranslationOrg(namespace, options);
}
