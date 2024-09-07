import { B4hPageTitle } from '../../../components/pageTitle';
import { GroupForm } from '../groupForm/groupForm';
import styles from './addGroupPage.module.scss';

export const AddGroupPage = () => {
  return (
    <>
      <B4hPageTitle>home | add group</B4hPageTitle>

      <div className={styles.container}>
        <h1 className={styles.title}>add group</h1>
        <GroupForm />
      </div>
    </>
  );
};
