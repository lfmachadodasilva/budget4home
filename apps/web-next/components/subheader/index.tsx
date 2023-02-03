import styles from './index.module.scss';

export interface SubHeaderProps {
  label: string;
  action?: JSX.Element;
}

export const SubHeader = (props: SubHeaderProps) => {
  return (
    <div className={styles.container}>
      <h3>{props.label}</h3>
      {props.action && props.action}
    </div>
  );
};
