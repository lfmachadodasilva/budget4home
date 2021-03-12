import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import { ItemHeaderComponent } from '../../components/itemHeader/itemHeader';
import { GlobalContext } from '../../contexts/globalContext';
import { csvToExpenses } from '../../helpers/csvToExpenses';
import { ExpenseModel, ExpenseType } from '../../models/expenseModel';

enum StatusType {
  NOT_PROCESSED = 'to do',
  PROCESSING = 'doing',
  PROCESSED = 'done',
  ERROR = 'error'
}

export const ImportPage = memo(() => {
  const [t] = useTranslation();
  const { groups, group } = useContext(GlobalContext);
  const [selectedGroup, setSelectedGroup] = useState<number>(group);
  const [separator, setSeparator] = useState<string>(',');
  const [data, setData] = useState<string>('');
  const [expenses, setExpenses] = React.useState<ExpenseModel[]>([]);
  const [status, setStatus] = React.useState<StatusType[]>([]);

  useEffect(() => {
    setSelectedGroup(group);
  }, [group]);

  useEffect(() => {
    if (!separator) {
      setExpenses([]);
      return;
    }

    try {
      const tmpExpenses = csvToExpenses(data, '\n', separator, t('DATE_FORMAT'));
      setStatus(tmpExpenses.map(_ => StatusType.NOT_PROCESSED));
      setExpenses(tmpExpenses);
    } catch {
      setExpenses([]);
    }
  }, [separator, data, group, t]);

  const handleOnChangeGroup = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(+event.target.value);
  }, []);
  const handleOnChangeSeparator = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSeparator(event.target.value);
  }, []);
  const handleOnChangeData = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(event.target.value);
  }, []);

  const handleOnAction = useCallback(() => {}, []);

  const groupsOptions = useMemo(
    () =>
      groups.map(x => (
        <option key={x.id} value={x.id}>
          {x.name}
        </option>
      )),
    [groups]
  );
  const expensesRows = React.useMemo(
    () =>
      expenses.map((expense, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td
            className={
              status[index] === StatusType.ERROR
                ? 'text-danger'
                : status[index] === StatusType.PROCESSED
                ? 'text-success'
                : ''
            }
          >
            {status[index].toString()}
          </td>
          <td>{expense.type === ExpenseType.Incoming ? t('INCOMING') : t('OUTCOMING')}</td>
          <td>{expense.name}</td>
          <td>{expense.value.toFixed(2)}</td>
          <td>
            {expense.date && !isNaN(expense.date.getTime())
              ? format(new Date(expense.date), t('DATE_FORMAT'))
              : t('INVALID_DATE')}
          </td>
          <td>{expense.labelName}</td>
          <td>{expense.comments}</td>
        </tr>
      )),
    [expenses, status, t, StatusType.ERROR, StatusType.PROCESSED]
  );

  return (
    <>
      <ItemHeaderComponent title={t('IMPORT')} actionText={t('ADD')} onAction={handleOnAction} />
      <form>
        <div className="row justify-content-md-center">
          <div className="col-xs-12 col-sm-6">
            <label htmlFor="search-group">{t('GROUP')}</label>
            <select
              className="form-select"
              aria-label="Search by group"
              value={selectedGroup}
              onChange={handleOnChangeGroup}
            >
              {groupsOptions}
            </select>
          </div>
          <div className="col-xs-12 col-sm-6">
            <label htmlFor="search-group">{t('SEPARATOR')}</label>
            <input type="text" className="form-control" onChange={handleOnChangeSeparator} value={separator} />
          </div>
        </div>
        <label htmlFor="search-group">{t('IMPORT_DATA')}</label>
        <textarea className="form-control" rows={5} onChange={handleOnChangeData} value={data} />
      </form>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">{t('NUMBER')}</th>
              <th scope="col">{t('STATUS')}</th>
              <th scope="col">{t('TYPE')}</th>
              <th scope="col">{t('NAME')}</th>
              <th scope="col">{t('VALUE')}</th>
              <th scope="col">{t('DATE')}</th>
              <th scope="col">{t('LABEL')}</th>
              <th scope="col">{t('COMMENTS')}</th>
            </tr>
          </thead>
          <tbody>{expensesRows}</tbody>
        </table>
      </div>
    </>
  );
});
