import { FC, memo } from 'react';

export enum AlertTypes {
  Primary = 'alert-primary',
  Secondary = 'alert-secondary',
  Success = 'alert-success',
  Danger = 'alert-danger',
  Warning = 'alert-warning',
  Info = 'alert-info',
  Light = 'alert-light',
  Dark = 'alert-dark'
}

export type AlertProps = {
  show: boolean;
  title?: string;
  body: string | JSX.Element;
  type?: AlertTypes;
};

export const AlertComponent: FC<AlertProps> = memo((props: AlertProps) => {
  const { show, title, body, type = AlertTypes.Danger } = props;

  if (!show) {
    return <></>;
  }
  return (
    <div className={`alert ${type.toString()} mb-2`} role="alert">
      {title && <h4 className="alert-heading">{title}</h4>}
      {body}
    </div>
  );
});
