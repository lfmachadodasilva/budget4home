import { GroupForm } from '../groupForm/groupForm';
import styles from './addGroupPage.module.scss';

export const AddGroupPage = () => {
  return (
    <>
      <title>home | add group</title>

      <div className={styles.container}>
        <h1 className={styles.title}>add group</h1>
        <GroupForm />
      </div>
    </>
  );
};
