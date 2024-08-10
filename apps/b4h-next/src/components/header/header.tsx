import Link from 'next/link';

import { B4hHeaderMenu } from './headerMenu/headerMenu';
import { B4hHeaderUser } from './headerUser/headerUser';

export const B4hHeader = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '8px',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <B4hHeaderMenu />
          <Link href="/">bugtet4home</Link>
        </div>
        <div>
          <B4hHeaderUser />
        </div>
      </div>
    </>
  );
};
