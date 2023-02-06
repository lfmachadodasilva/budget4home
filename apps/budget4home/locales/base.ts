export type B4hLocale = {
  title: string;
  common: {
    missingGroup: JSX.Element;
    optional: string;
  };
  header: {
    groups: string;
    labels: string;
    expenses: string;
    settings: string;
    logout: string;
  };
  home: {
    welcome: JSX.Element;
    add: string;
    balanace: string;
  };
  settings: {
    title: string;
    action: string;
    email: string;
    displayName: string;
    avatar: string;
    successEditSettings: string;
    failUploadAvatar: string;
    failEditSettings: string;
  };
};
