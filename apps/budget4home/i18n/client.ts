'use client';

import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import { defaultLanguage, defaultNamespace, getOptions } from './settings';

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init(getOptions());

export function useTranslation(
  namespace: string = defaultNamespace,
  language: string = defaultLanguage,
  options: any = {}
) {
  if (i18next.resolvedLanguage !== language) i18next.changeLanguage(language);
  return useTranslationOrg(namespace, options);
}
