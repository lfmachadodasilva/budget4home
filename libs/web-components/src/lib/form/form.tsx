import { ComponentPropsWithoutRef, memo } from 'react';
import styles from './form.module.scss';

export interface B4hFormProps extends ComponentPropsWithoutRef<'form'> {}

export const B4hForm = memo((props: B4hFormProps) => {
  return (
    <form {...props} className={styles.container}>
      {props.children}
    </form>
  );
});
