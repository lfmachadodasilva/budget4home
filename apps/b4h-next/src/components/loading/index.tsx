import styles from './loading.module.scss';

export const B4hLoading = () => {
  return (
    <>
      <div className={styles.container}>
        <B4hLoadingLogo />
      </div>
    </>
  );
};

export const B4hLoadingLogo = ({ size }: { size?: number }) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.loadingLogo}
      src="/logo64.png"
      alt="loading"
      width={size ?? 64}
      height={size ?? 64}
    />
  );
};
