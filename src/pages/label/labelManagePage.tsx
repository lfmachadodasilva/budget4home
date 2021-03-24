import { ChangeEvent, FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import { ItemFooterComponent } from '../../components/itemFooter/itemFooter';
import { ItemHeaderComponent } from '../../components/itemHeader/itemHeader';
import { redirectTo } from '../../helpers/redirectHelper';
import { LabelModel } from '../../models/labelModel';
import { addLabel, editLabel, getLabel } from '../../services/labelService';
import { Routes } from '../routes';
import { AlertComponent, AlertTypes } from '../../components/alert/alert';

interface ManageProps {
  id: string;
  groupId: string;
}

export const LabelManagePage: FC = memo(() => {
  const [t] = useTranslation();

  const history = useHistory();
  const { id, groupId } = useParams<ManageProps>();
  const [isEditMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState<string>();

  const handleOnChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const handleOnAction = useCallback(() => {
    const runAsync = async () => {
      const label = { id: +id ?? 0, name } as LabelModel;
      if (isEditMode) {
        editLabel(label, +groupId)
          .then(() => {
            redirectTo(history, Routes.label);
          })
          .catch(() => setError(t('ERROR_EDIT')));
      } else {
        addLabel(label, +groupId)
          .then(() => {
            redirectTo(history, Routes.label);
          })
          .catch(() => setError(t('ERROR_ADD')));
      }
    };
    runAsync();
  }, [isEditMode, name, history, id, groupId, t]);

  const handleOnCancel = useCallback(() => {
    redirectTo(history, Routes.label);
  }, [history]);

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
          var label = await getLabel(+id);
          setName(label.name);
        } catch {
          setError(t('ERROR_DELETE'));
        }
      };
      runAsync();
    }
  }, [id, t]);

  const isActionDisabled = useMemo(() => {
    return name.length === 0;
  }, [name]);

  return (
    <>
      <ItemHeaderComponent title={t('LABEL')} />
      <AlertComponent show={error !== undefined} body={error ?? ''} type={AlertTypes.Danger} />
      <form>
        <div className="mb-2">
          <label htmlFor="group-name" className="form-label">
            {t('NAME')}
          </label>
          <input type="text" className="form-control" id="group-name" onChange={handleOnChangeName} value={name} />
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
