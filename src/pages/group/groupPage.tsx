import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ItemHeaderComponent } from '../../components/itemHeader/itemHeader';
import { ItemComponent, ItemsComponent } from '../../components/items/items';
import { getUserDisplayName } from '../../helpers/userHelper';
import { GroupFullModel } from '../../models/groupModel';
import { getFullAllGroups } from '../../services/groupService';

export const GroupPage = memo(() => {
  const [t] = useTranslation();
  const [groups, setGroups] = useState<GroupFullModel[]>([]);
  useEffect(() => {
    getFullAllGroups().then(value => setGroups(value));
  }, []);

  const handleOnAdd = useCallback(() => {}, []);
  const handleOnEdit = useCallback((id: number | string) => {}, []);
  const handleOnDelete = useCallback((id: number | string) => {}, []);

  const groupsItems = useMemo(
    () =>
      groups.map(g => (
        <ItemComponent id={g.id} title={g.name} onEdit={handleOnEdit} onDelete={handleOnDelete}>
          {g.users.map(u => {
            return (
              <div className="m-1">
                <small>{getUserDisplayName(u)}</small>
              </div>
            );
          })}
        </ItemComponent>
      )),
    [groups]
  );

  return (
    <>
      <ItemHeaderComponent title={t('GROUP')} actionText={t('ADD')} onAction={handleOnAdd} />
      <ItemsComponent>{groupsItems}</ItemsComponent>
    </>
  );
});
