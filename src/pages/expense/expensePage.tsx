import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { useHistory } from 'react-router';
import { replace } from 'lodash';

import { ItemHeaderComponent } from '../../components/itemHeader/itemHeader';
import { ItemComponent, ItemsComponent } from '../../components/items/items';
import { SearchComponent } from '../../components/search/search';
import { GlobalContext } from '../../contexts/globalContext';
import { ExpenseModel, ExpenseType } from '../../models/expenseModel';
import { deleteExpense, getAllExpenses } from '../../services/expenseService';
import { redirectTo } from '../../helpers/redirectHelper';
import { Routes } from '../routes';
import { AlertComponent, AlertTypes } from '../../components/alert/alert';
import { TabsComponent } from '../../components/tabs/tabs';
import { ExpenseSummaryPage } from './expenseSummary';

export const ExpensePage = memo(() => {
  const [t] = useTranslation();
  const history = useHistory();
  const { group, month, year } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState<string>();
  const [expenses, setExpenses] = useState<ExpenseModel[]>([]);

  useEffect(() => {
    setError(undefined);
    setLoading(true);
    getAllExpenses(group, month, year)
      .then(value => setExpenses(value))
      .catch(() => setError(t('ERROR_LOAD')))
      .finally(() => setLoading(false));
  }, [group, month, year, t, reload]);

  const handleOnAdd = useCallback(() => {
    redirectTo(history, replace(Routes.expenseAdd, ':groupId', group.toString()));
  }, [history, group]);
  const handleOnEdit = useCallback(
    (id: number | string) => {
      const pathWithGroup = replace(Routes.expenseManage, ':groupId', group.toString());
      const pathWithGroupAndId = replace(pathWithGroup, ':id', id.toString());
      redirectTo(history, pathWithGroupAndId);
    },
    [history, group]
  );
  const handleOnDelete = useCallback(
    (id: number | string) => {
      window.confirm(t('DELETE_EXPENSE')) &&
        deleteExpense(id as number)
          .then(() => {})
          .catch(() => setError(t('ERROR_DELETE')))
          .finally(() => setReload(!reload));
    },
    [reload, t]
  );

  const mapItems = useCallback(
    (items: ExpenseModel[]) =>
      items.map(e => (
        <div key={e.id}>
          <ItemComponent
            id={e.id}
            title={e.name}
            subTitle={e.scheduleTotal > 1 ? ` (${e.scheduleBy}/${e.scheduleTotal})` : undefined}
            onEdit={handleOnEdit}
            onDelete={handleOnDelete}
          >
            <div className="d-flex justify-content-between">
              <div className="m-1">
                <small>{t('DATE')}</small>
                <br></br>
                <strong>{format(new Date(e.date), t('DATE_FORMAT'))}</strong>
              </div>
              <div className="m-1">
                <small>{t('LABEL')}</small>
                <br></br>
                <strong>{e.labelName}</strong>
              </div>
              <div className="m-1">
                <small>{t('VALUE')}</small>
                <br></br>
                <strong>{e.value.toFixed(2)}</strong>
              </div>
            </div>
          </ItemComponent>
        </div>
      )),
    [handleOnEdit, handleOnDelete, t]
  );

  const [incoming, outcoming] = useMemo(() => {
    let outcoming: ExpenseModel[] = [];
    let incoming: ExpenseModel[] = [];

    expenses.forEach(e => (e.type === ExpenseType.Incoming ? incoming.push(e) : outcoming.push(e)));

    return [mapItems(incoming), mapItems(outcoming)];
  }, [expenses, mapItems]);

  return (
    <>
      <SearchComponent />
      <AlertComponent show={error !== undefined} body={error ?? ''} />
      <ItemHeaderComponent
        title={t('EXPENSE')}
        actionText={t('ADD')}
        onAction={handleOnAdd}
        disableAction={isLoading || error !== undefined}
      />
      <TabsComponent
        items={[
          { key: 'summary', title: t('SUMMARY'), body: <ExpenseSummaryPage items={expenses} /> },
          {
            key: 'incoming',
            title: t('INCOMING'),
            body: <ItemsComponent isLoading={isLoading}>{incoming}</ItemsComponent>
          },
          {
            key: 'outcoming',
            title: t('OUTCOMING'),
            body: <ItemsComponent isLoading={isLoading}>{outcoming}</ItemsComponent>
          }
        ]}
      />
    </>
  );
});
