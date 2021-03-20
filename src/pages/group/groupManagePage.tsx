import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import { ItemFooterComponent } from '../../components/itemFooter/itemFooter';
import { ItemHeaderComponent } from '../../components/itemHeader/itemHeader';
import { redirectTo } from '../../helpers/redirectHelper';
import { getUserDisplayName } from '../../helpers/userHelper';
import { GroupModel } from '../../models/groupModel';
import { UserModel } from '../../models/userModel';
import { addGroup, editGroup, getGroup } from '../../services/groupService';
import { getAllUsers } from '../../services/userService';
import { Routes } from '../routes';

interface ManageProps {
  id: string;
}

export const GroupManagePage = memo(() => {
  const [t] = useTranslation();
  const history = useHistory();
  const { id } = useParams<ManageProps>();
  const [isEditMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [users, setUsers] = useState<UserModel[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleOnChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);
  const handleOnChangeUser = useCallback(event => {
    setSelectedUsers(Array.from(event.target.selectedOptions, (option: any) => option.value));
  }, []);

  const handleOnAction = useCallback(() => {
    const runAsync = async () => {
      if (isEditMode) {
        editGroup({
          id: +id,
          name,
          users: selectedUsers
        } as GroupModel)
          .then(() => {
            redirectTo(history, Routes.group);
          })
          .catch(() => {
            // TODO
          });
      } else {
        addGroup({
          id: 0,
          name,
          users: selectedUsers
        } as GroupModel)
          .then(() => {
            redirectTo(history, Routes.group);
          })
          .catch(() => {
            // TODO
          });
      }
    };
    runAsync();
  }, [isEditMode, name, selectedUsers, history, id]);
  const handleOnCancel = useCallback(() => {
    redirectTo(history, Routes.group);
  }, [history]);

  useEffect(() => {
    // get users
    const runAsync = async () => {
      getAllUsers()
        .then(value => {
          setUsers(value);
        })
        .catch(() => {
          // TODO
        });
    };
    runAsync();
  }, []);

  useEffect(() => {
    if (isNaN(+id)) {
      // show error
      return;
    }

    setEditMode(+id !== 0);
    if (+id !== 0) {
      // get group to edit
      const runAsync = async () => {
        try {
          var group = await getGroup(+id);
          setName(group.name);
          setSelectedUsers(group.users);
        } catch {}
      };
      runAsync();
    }
  }, [id]);

  const usersOption = useMemo(
    () =>
      users.map(u => (
        <option key={u.id} value={u.id}>
          {`${getUserDisplayName(u)} - ${u.email}`}
        </option>
      )),
    [users]
  );

  const isActionDisabled = useMemo(() => {
    return name.length === 0 || selectedUsers.length === 0;
  }, [selectedUsers, name]);

  return (
    <>
      <ItemHeaderComponent title={t('GROUP')} />
      <form>
        <div className="mb-2">
          <label htmlFor="group-name" className="form-label">
            {t('NAME')}
          </label>
          <input type="text" className="form-control" id="group-name" onChange={handleOnChangeName} value={name} />
        </div>
        <div className="mb-2">
          <label htmlFor="group-users" className="form-label">
            {t('USERS')}
          </label>
          <select
            id={'group-users'}
            className="form-select"
            size={5}
            multiple
            aria-label="size 3 select example"
            value={selectedUsers}
            onChange={handleOnChangeUser}
          >
            {usersOption}
          </select>
        </div>
      </form>
      <ItemFooterComponent
        primaryText={isEditMode ? t('EDIT') : t('ADD')}
        onPrimary={handleOnAction}
        disablePrimary={isActionDisabled}
        secondaryText={t('CANCEL')}
        onSecondary={handleOnCancel}
      />
    </>
  );
});
