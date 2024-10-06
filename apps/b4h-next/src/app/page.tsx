import styles from './page.module.scss';

export const metadata = {
  title: 'budget4home'
};

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>home</h1>
      <p>welcome to budget4home!</p>
    </div>
  );
}
