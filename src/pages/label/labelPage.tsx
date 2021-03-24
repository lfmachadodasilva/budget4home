import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { replace } from 'lodash';

import { ItemHeaderComponent } from '../../components/itemHeader/itemHeader';
import { ItemComponent, ItemsComponent } from '../../components/items/items';
import { SearchComponent } from '../../components/search/search';
import { GlobalContext } from '../../contexts/globalContext';
import { redirectTo } from '../../helpers/redirectHelper';
import { LabelFullModel } from '../../models/labelModel';
import { deleteLabel, getFullAllLabels } from '../../services/labelService';
import { Routes } from '../routes';
import { AlertComponent, AlertTypes } from '../../components/alert/alert';
import { TabsComponent } from '../../components/tabs/tabs';
import { LabelGraphPage } from './labelGraphPage';

export const LabelPage = memo(() => {
  const [t] = useTranslation();
  const history = useHistory();
  const { group, month, year } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState<string>();

  const [labels, setLabels] = useState<LabelFullModel[]>([]);
  useEffect(() => {
    setLoading(true);
    getFullAllLabels(group, month, year)
      .then(value => setLabels(value))
      .catch(() => setError(t('ERROR_LOAD')))
      .finally(() => setLoading(false));
  }, [group, month, year, reload, t]);

  const handleOnAdd = useCallback(() => {
    redirectTo(history, replace(Routes.labelAdd, ':groupId', group.toString()));
  }, [history, group]);
  const handleOnEdit = useCallback(
    (id: number | string) => {
      redirectTo(history, replace(Routes.labelEdit, ':id', id.toString()));
    },
    [history]
  );
  const handleOnDelete = useCallback(
    (id: number | string) => {
      window.confirm(t('DELETE_LABEL')) &&
        deleteLabel(id as number)
          .then(() => {})
          .catch(() => setError(t('ERROR_DELETE')))
          .finally(() => {
            setReload(!reload);
          });
    },
    [reload, t]
  );
  const labelsItems = useMemo(
    () =>
      labels.map(l => (
        <div key={l.id}>
          <ItemComponent id={l.id} title={l.name} onEdit={handleOnEdit} onDelete={handleOnDelete}>
            <div className="d-flex justify-content-between">
              <div className="m-1">
                <small>{t('CURRENT_VALUE')}</small>
                <br></br>
                <strong>{l.currValue}</strong>
              </div>
              <div className="m-1">
                <small>{t('LAST_VALUE')}</small>
                <br></br>
                <strong>{l.lastValue}</strong>
              </div>
              <div className="m-1">
                <small>{t('AVERAGE_VALUE')}</small>
                <br></br>
                <strong>{l.avgValue}</strong>
              </div>
            </div>
          </ItemComponent>
        </div>
      )),
    [labels, handleOnEdit, handleOnDelete, t]
  );

  return (
    <>
      <SearchComponent />
      <ItemHeaderComponent
        title={t('LABEL')}
        actionText={t('ADD')}
        onAction={handleOnAdd}
        disableAction={isLoading || error !== undefined}
      />
      <AlertComponent show={error !== undefined} body={error ?? ''} type={AlertTypes.Danger} />
      <TabsComponent
        items={[
          {
            key: 'graph',
            title: t('GRAPH'),
            body: <LabelGraphPage isLoading={isLoading} items={labels} />
          },
          {
            key: 'items',
            title: t('ITEMS'),
            body: <ItemsComponent isLoading={isLoading}>{labelsItems}</ItemsComponent>
          }
        ]}
      />
    </>
  );
});
