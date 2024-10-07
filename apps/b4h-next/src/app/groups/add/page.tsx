import { B4hGroupForm } from '../form';
import { users } from '../mock';

export const metadata = {
  title: 'add group | budget4home'
};

export default function GroupAdd() {
  return <B4hGroupForm users={users} />;
}
