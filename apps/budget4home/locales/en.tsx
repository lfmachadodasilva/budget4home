import { B4hRoutes } from '../util/routes';
import { B4hLocale } from './base';

export const en: B4hLocale = {
  title: 'budget4gome',
  common: {
    missingGroup: (
      <>
        You don't have any group yet. Click <a href={`${B4hRoutes.groupAdd}`}>here</a> to create one
      </>
    ),
    optional: '(optional)'
  },
  header: {
    groups: 'groups',
    labels: 'labels',
    expenses: 'expenses',
    settings: 'settings',
    logout: 'logout'
  },
  home: {
    welcome: (
      <>
        <small>Welcome to</small> budget4home
      </>
    ),
    balanace: 'You current balance is:',
    add: 'add new expense'
  },
  settings: {
    title: 'User settings',
    action: 'Edit',
    email: 'Email',
    displayName: 'Display name',
    avatar: 'Avatar',
    successEditSettings: 'Done!',
    failUploadAvatar: 'Fail to upload your avatar. Try again later.',
    failEditSettings: 'Fail to edit your settings. Try again later.'
  }
};
