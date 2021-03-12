export const getUserDisplayName = (user: any | undefined | null) => {
  if (!user) {
    return '';
  }

  if (user && user.displayName) {
    return user.displayName?.split(' ')[0];
  }

  if (user && user.name) {
    return user.name?.split(' ')[0];
  }

  return user.email?.split('@')[0];
};
