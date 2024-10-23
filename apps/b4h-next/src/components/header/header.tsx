import { B4hRoutes } from '@/utils/routes';
import Link from 'next/link';
import { B4hMenuMain } from './menuMain';
import { B4hMenuUser } from './menuUser';

export const B4hHeader = () => {
  return (
    <div className="flex justify-between items-center bg-primary p-2">
      <B4hMenuMain />
      <Link href={B4hRoutes.home}>
        <p className="text-lg">budget4home</p>
      </Link>
      <B4hMenuUser />
    </div>
  );
};
