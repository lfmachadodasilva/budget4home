import styles from './page.module.scss';

export const metadata = {
  title: 'budget4home'
};

export default async function Home() {
  // const { userId, getFavoriteGroupId } = b4hSession();
  // const groupId = await getFavoriteGroupId();
  // const expenses = groupId && (await getExpensesFirebase(userId, groupId));
  return (
    <div className={styles.page}>
      <h1>home</h1>
      <p>welcome to budget4home!</p>
      {/* <br />
      {expenses && (
        <>
          <p>summary of your ⭐️ group</p>
          <B4hExpenseSummary expenses={expenses} />
        </>
      )}
      */}
    </div>
  );
}
