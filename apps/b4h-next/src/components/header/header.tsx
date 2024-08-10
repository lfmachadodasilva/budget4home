import Link from 'next/link';

import { B4hHeaderUser } from './userHeader/headerUser';

export const B4hHeader = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href="/">bugtet4home</Link>
          <Link href="/">Home</Link>
          <Link href="/groups">Groups</Link>
          <Link href="/labels">Labels</Link>
          <Link href="/expenses">Expenses</Link>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <B4hHeaderUser />
        </div>
      </div>
    </>
  );
};
