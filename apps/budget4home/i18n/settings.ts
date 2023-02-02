export const fallbackLng = 'en';
export const defaultLanguage = 'en';
export const defaultNamespace = 'index';
export const languages = [defaultLanguage];
export const defaultNS = 'translation';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  };
}
