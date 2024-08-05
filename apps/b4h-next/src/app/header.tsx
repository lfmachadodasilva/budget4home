import Link from 'next/link';

export const B4hHeader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Link href="/">bugtet4home</Link>
        <Link href="/">Home</Link>
        <Link href="/groups">Groups</Link>
        <Link href="/labels">Labels</Link>
        <Link href="/expenses">Expenses</Link>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Link href="/login">Login</Link>
        <Link href="/logout">Logout</Link>
      </div>
    </div>
  );
};
