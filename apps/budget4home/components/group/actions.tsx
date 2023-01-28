'use client';

import { B4hDropdown } from '@budget4home/ui-components';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { B4hRoutes } from '../../util/routes';

interface GroupActionsProps {
  groupId: string;
  children: JSX.Element;
}

export const GroupActions = (props: GroupActionsProps) => {
  const { push } = useRouter();
  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!event.target.value) {
      return;
    }
    push(`${B4hRoutes.groups}/${props.groupId}${event.target.value}`);
  };

  return (
    <B4hDropdown
      options={[
        { key: '/', value: 'edit' },
        { key: B4hRoutes.import, value: 'import' },
        { key: B4hRoutes.export, value: 'export' },
        { key: B4hRoutes.labels, value: 'labels' },
        { key: B4hRoutes.expenses, value: 'expenses' }
      ]}
      onChange={handleOnChange}
    >
      {props.children}
    </B4hDropdown>
  );
};
