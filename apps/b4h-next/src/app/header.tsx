import Link from 'next/link';

export const B4hHeader = () => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      Header
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/logout">Logout</Link>
      <Link href="/groups">Groups</Link>
      <Link href="/labels">Labels</Link>
      <Link href="/expenses">Expenses</Link>
    </div>
  );
};
