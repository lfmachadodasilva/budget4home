import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const defaultProps = {
  size: 'sm',
  colorScheme: 'primary'
};

const overrides = {
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
    cssVarPrefix: 'b4h'
  } as ThemeConfig,

  colors: {
    primary: {
      50: '#f3e5ff',
      100: '#d1b3ff',
      200: '#af80ff',
      300: '#8d4dff',
      400: '#6b1aff',
      500: '#572A68', // primary color
      600: '#482154',
      700: '#381940',
      800: '#28112C',
      900: '#180918'
    }
  },

  styles: {
    global: {
      body: {
        display: 'block'
      },
      'html[data-theme=dark] body': {},
      'html[data-theme=light] body': {}
    }
  },

  components: {
    Button: {
      defaultProps: {
        ...defaultProps
      }
    },
    Input: {
      defaultProps: {
        ...defaultProps,
        focusBorderColor: 'primary.600'
      }
    },
    FormLabel: {
      defaultProps: {
        ...defaultProps,
        fontSize: 'sm'
      }
    }
  }
};

export const B4hTheme = extendTheme(overrides);
