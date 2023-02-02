import { CgSpinner } from 'react-icons/cg';

import styles from './index.module.scss';

export interface B4hSpinnerProps {
  size?: number;
  label?: string;
}

export const B4hSpinner = (props: B4hSpinnerProps) => {
  return (
    <div className={styles.container}>
      <CgSpinner className={styles.spinner} size={props.size} />
      {props.label && <p className={styles.label}>{props.label}</p>}
    </div>
  );
};
