export const redirectTo = (history: any, path: string) => {
  if (history.location.search) {
    history.push({ pathname: path, search: history.location.search });
  } else {
    history.push(path);
  }
};
