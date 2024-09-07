import { B4hPageTitle } from '../../../components/pageTitle';
import { LabelForm } from '../labelForm/labelForm';
import styles from './addLabelPage.module.scss';

export const AddLabelPage = () => {
  return (
    <>
      <B4hPageTitle>home | add label</B4hPageTitle>

      <div className={styles.container}>
        <h1 className={styles.title}>add label</h1>
        <LabelForm />
      </div>
    </>
  );
};
