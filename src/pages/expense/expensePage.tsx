import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import { ItemHeaderComponent } from '../../components/itemHeader/itemHeader';
import { ItemComponent, ItemsComponent } from '../../components/items/items';
import { SearchComponent } from '../../components/search/search';
import { GlobalContext } from '../../contexts/globalContext';
import { ExpenseModel } from '../../models/expenseModel';
import { getAllExpenses } from '../../services/expenseService';

export const ExpensePage = memo(() => {
  const [t] = useTranslation();
  const { group, month, year } = useContext(GlobalContext);

  const [expenses, setExpenses] = useState<ExpenseModel[]>([]);
  useEffect(() => {
    getAllExpenses(group, month, year).then(value => setExpenses(value));
  }, [group, month, year]);

  const handleOnAdd = useCallback(() => {}, []);
  const handleOnEdit = useCallback((id: number | string) => {}, []);
  const handleOnDelete = useCallback((id: number | string) => {}, []);

  const labelsItems = useMemo(
    () =>
      expenses.map(e => (
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
      )),
    [expenses]
  );

  return (
    <>
      <SearchComponent />
      <ItemHeaderComponent title={t('EXPENSE')} actionText={t('ADD')} onAction={handleOnAdd} />
      <ItemsComponent>{labelsItems}</ItemsComponent>
    </>
  );
});
