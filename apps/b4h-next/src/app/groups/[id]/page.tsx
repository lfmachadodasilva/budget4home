import { B4hGroupForm } from '../form';
import { groups, users } from '../mock';

export const metadata = {
  title: 'update group | budget4home'
};

export default function GroupUpdate({ params }: { params: { id: string } }) {
  const { id } = params;

  return <B4hGroupForm users={users} group={groups.find(group => group.id === id)} />;
}
