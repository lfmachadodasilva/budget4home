import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // here we will place our translations...
          global: {
            header: {
              title: 'budget4home',
              groups: 'Groups',
              labels: 'Labels',
              expenses: 'Expenses',

              login: 'Login',
              register: 'Register',
              logout: 'Logout'
            },
            validation: {
              required: 'This is required',
              minLength: 'Minimum length should be 4',
              confirmPassword: 'Passwords must match'
            },
            error: 'Something went wrong. Please try again later.'
          },
          login: {
            title: 'Login',
            email: 'Email',
            emailPlaceholder: 'type your email here',
            password: 'Password',
            passwordPlaceholder: 'do you remember me?',
            submit: 'Login',
            forgot: 'Forgot password?',
            register: 'Register',
            error: {
              title: 'Fail to login'
            }
          },
          register: {
            title: 'Register',
            email: 'Email',
            emailPlaceholder: 'type your email here',
            password: 'Password',
            passwordPlaceholder: 'type your new password here',
            password2Placeholder: 'one more time',
            submit: 'Register',
            login: 'Login',
            error: {
              title: 'Fail to register'
            }
          }
        }
      }
    }
  });

export default i18n;
