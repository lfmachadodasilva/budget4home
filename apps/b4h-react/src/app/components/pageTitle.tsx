import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const B4hPageTitle = ({ children }: { children: string }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = children;
  }, [location, children]);

  return null;
};
