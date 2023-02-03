import nookies from 'nookies';

export const getDefaultOrFirstGroupId = () => {
  const cookies = nookies.get(undefined);
  return cookies['defaultGroupId'] ? cookies['defaultGroupId'] : null;
};
