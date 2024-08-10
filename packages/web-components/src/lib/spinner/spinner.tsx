import { type IconBaseProps } from 'react-icons';
import { CgSpinner } from 'react-icons/cg';

import styles from './spinner.module.scss';

export interface B4hSpinnerProps extends IconBaseProps {}

export const B4hSpinner = (props: B4hSpinnerProps) => {
  return <CgSpinner className={styles.spinner} {...props} />;
};
