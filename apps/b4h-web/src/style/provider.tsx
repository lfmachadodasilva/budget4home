import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import createCache from '@emotion/cache';

import { CacheProvider } from '@emotion/react';
import { B4hTheme } from './theme';

const emotionCache = createCache({
  key: 'emotion-css-cache',
  prepend: true // ensures styles are prepended to the <head>, instead of appended
});

export const StyleProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CacheProvider value={emotionCache}>
        <ChakraProvider theme={B4hTheme}>
          <ColorModeScript initialColorMode={B4hTheme.initialColorMode} />
          {children}
        </ChakraProvider>
      </CacheProvider>
    </>
  );
};
