import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { useHistory } from 'react-router';
import { replace } from 'lodash';

import { ItemHeaderComponent } from '../../components/itemHeader/itemHeader';
import { ItemComponent, ItemsComponent } from '../../components/items/items';
import { SearchComponent } from '../../components/search/search';
import { GlobalContext } from '../../contexts/globalContext';
import { ExpenseModel } from '../../models/expenseModel';
import { deleteExpense, getAllExpenses } from '../../services/expenseService';
import { redirectTo } from '../../helpers/redirectHelper';
import { Routes } from '../routes';

export const ExpensePage = memo(() => {
  const [t] = useTranslation();
  const history = useHistory();
  const { group, month, year } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(false);

  const [reload, setReload] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseModel[]>([]);

  useEffect(() => {
    setLoading(true);
    getAllExpenses(group, month, year)
      .then(value => setExpenses(value))
      .finally(() => setLoading(false));
  }, [group, month, year]);

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
      deleteExpense(id as number)
        .then(() => {})
        .catch(() => {
          // TODO error
        })
        .finally(() => {
          setReload(!reload);
        });
    },
    [reload]
  );

  const labelsItems = useMemo(
    () =>
      expenses.map(e => (
        <div key={e.id}>
          <ItemComponent id={e.id} title={e.name} onEdit={handleOnEdit} onDelete={handleOnDelete}>
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
                <strong>{e.value}</strong>
              </div>
            </div>
          </ItemComponent>
        </div>
      )),
    [expenses, handleOnEdit, handleOnDelete, t]
  );

  return (
    <>
      <SearchComponent />
      <ItemHeaderComponent title={t('EXPENSE')} actionText={t('ADD')} onAction={handleOnAdd} />
      <ItemsComponent isLoading={isLoading}>{labelsItems}</ItemsComponent>
    </>
  );
});
