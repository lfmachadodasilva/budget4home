import { FC, memo, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingOverlay from 'react-loading-overlay';

export type LoadingProps = {
  isLoading: boolean;
  text?: '';
};

export const LoadingComponent: FC<PropsWithChildren<LoadingProps>> = memo((props: PropsWithChildren<LoadingProps>) => {
  const [t] = useTranslation();

  return (
    <>
      <LoadingOverlay
        active={props.isLoading}
        spinner={
          <div className="spinner-border" role="status">
            <span className="sr-only">{t('LOADING')}</span>
          </div>
        }
        text={
          <>
            <p>{props.text ?? t('LOADING')}</p>
          </>
        }
      >
        {props.children}
      </LoadingOverlay>
    </>
  );
});
