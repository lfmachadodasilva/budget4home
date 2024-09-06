import { LabelForm } from '../labelForm/labelForm';
import styles from './addLabelPage.module.scss';

export const AddLabelPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>add label</h1>
      <LabelForm />
    </div>
  );
};
