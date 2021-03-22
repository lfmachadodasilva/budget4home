import { FC, memo, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

export type LoadingProps = {
  isLoading: boolean;
  text?: string;
};

export const LoadingComponent: FC<PropsWithChildren<LoadingProps>> = memo((props: PropsWithChildren<LoadingProps>) => {
  const [t] = useTranslation();

  return props.isLoading ? (
    <>
      <div className="d-flex justify-content-center m-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <p>{props.text ?? t('LOADING')}</p>
      </div>
    </>
  ) : (
    <>{props.children}</>
  );
});
