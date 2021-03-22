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
  type: AlertTypes;
};

export const AlertComponent: FC<AlertProps> = memo((props: AlertProps) => {
  if (!props.show) {
    return <></>;
  }
  return (
    <div className={`alert ${props.type.toString()}`} role="alert">
      {props.title && <h4 className="alert-heading">{props.title}</h4>}
      {props.body}
    </div>
  );
});
