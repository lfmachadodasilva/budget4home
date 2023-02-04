export type B4hLocale = {
  title: string;
  common: {
    missingGroup: JSX.Element;
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
};
