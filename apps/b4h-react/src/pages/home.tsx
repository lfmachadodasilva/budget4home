import { useB4hGroups } from '../providers/groupsProvider';

export const HomePage = () => {
  const { query } = useB4hGroups();

  return <div> Home {JSON.stringify(query)}</div>;
};
