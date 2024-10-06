import { HTMLProps } from 'react';
import styles from './form.module.scss';

const Root = (props: HTMLProps<HTMLFormElement>) => {
  return (
    <form {...props} className={styles.form}>
      {props.children}
    </form>
  );
};
const Actions = (props: HTMLProps<HTMLDivElement>) => <div {...props} className={styles.actions} />;
const Input = (props: HTMLProps<HTMLInputElement>) => <input {...props} className={styles.input} />;
const Label = (props: HTMLProps<HTMLLabelElement>) => <label {...props} className={styles.label} />;
const LabelError = (props: HTMLProps<HTMLLabelElement>) => (
  <label {...props} className={styles.labelError} />
);

export const B4hForm = {
  Root,
  Input,
  Label,
  LabelError,
  Actions
};
