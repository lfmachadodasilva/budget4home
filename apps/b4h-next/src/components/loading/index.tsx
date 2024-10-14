import { ReactNode } from 'react';
import styles from './loading.module.scss';

export const B4hLoading = () => {
  return (
    <>
      <p className={styles.container}>loading...</p>
      <B4hLoadingLogo />
    </>
  );
};

export const B4hLoadingLogo = ({ children }: { children?: ReactNode }) => {
  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo64.png" alt="loading" width={64} height={64} />
      {children}
    </div>
  );
};
