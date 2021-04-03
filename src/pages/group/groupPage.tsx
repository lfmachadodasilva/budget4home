import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { replace } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { ItemHeaderComponent } from '../../components/itemHeader/itemHeader';
import { ItemComponent, ItemsComponent } from '../../components/items/items';
import { redirectTo } from '../../helpers/redirectHelper';
import { getUserDisplayName } from '../../helpers/userHelper';
import { GroupFullModel } from '../../models/groupModel';
import { deleteGroup, getFullAllGroups } from '../../services/groupService';
import { Routes } from '../routes';
import { AlertComponent, AlertTypes } from '../../components/alert/alert';
import { GlobalContext } from '../../contexts/globalContext';

export const GroupPage = memo(() => {
  const [t] = useTranslation();
  const history = useHistory();
  const { onReload } = useContext(GlobalContext);

  const [groups, setGroups] = useState<GroupFullModel[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setLoading(true);
    getFullAllGroups()
      .then(value => setGroups(value))
      .catch(() => setError(t('ERROR_LOAD')))
      .finally(() => setLoading(false));
  }, [reload, t]);

  const handleOnAdd = useCallback(() => {
    redirectTo(history, replace(Routes.groupManage, ':id', '0'));
  }, [history]);
  const handleOnEdit = useCallback(
    (id: number | string) => {
      redirectTo(history, replace(Routes.groupManage, ':id', id.toString()));
    },
    [history]
  );
  const handleOnDelete = useCallback(
    (id: number | string) => {
      window.confirm(t('DELETE_GROUP')) &&
        deleteGroup(id as number)
          .then(() => onReload())
          .catch(() => setError(t('ERROR_DELETE')))
          .finally(() => setReload(!reload));
    },
    [reload, t, onReload]
  );

  const groupsItems = useMemo(
    () =>
      groups.map(g => (
        <div key={g.id}>
          <ItemComponent id={g.id} title={g.name} onEdit={handleOnEdit} onDelete={handleOnDelete}>
            <div className="d-flex">
              {g.users.map((u, index) => {
                return (
                  <div key={index} className="m-1">
                    {u.photoUrl ? (
                      <img
                        src={u.photoUrl + '?width=16&height=16'}
                        alt="user"
                        className="me-1"
                        style={{ borderRadius: '40%' }}
                      />
                    ) : (
                      <i className="bi bi-person-circle me-1" />
                    )}
                    <small>{getUserDisplayName(u)}</small>
                  </div>
                );
              })}
            </div>
          </ItemComponent>
        </div>
      )),
    [groups, handleOnEdit, handleOnDelete]
  );

  return (
    <>
      <AlertComponent show={error !== undefined} body={error ?? ''} />
      <ItemHeaderComponent
        title={t('GROUP')}
        actionText={t('ADD')}
        onAction={handleOnAdd}
        disableAction={isLoading || error !== undefined}
      />
      <ItemsComponent isLoading={isLoading}>{groupsItems}</ItemsComponent>
    </>
  );
});
