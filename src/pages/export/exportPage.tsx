import { memo, useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../contexts/globalContext';
import { ItemHeaderComponent } from '../../components/itemHeader/itemHeader';
import { getAllExpenses, getAllExpensesByGroup } from '../../services/expenseService';
import { ExpenseModel } from '../../models/expenseModel';
import { format } from 'date-fns';

export const ExportPage = memo(() => {
  const [t] = useTranslation();
  const { groups, group } = useContext(GlobalContext);

  const [selectedGroup, setSelectedGroup] = useState<number>(group);
  const [separator, setSeparator] = useState<string>(',');
  const [data, setData] = useState<string>('');
  const [isLoading, setLoading] = useState(false);

  const handleOnChangeGroup = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(+event.target.value);
  }, []);
  const handleOnChangeSeparator = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSeparator(event.target.value);
  }, []);

  const handleOnAction = useCallback(async () => {
    let expenses: ExpenseModel[] = [];
    setLoading(true);
    try {
      expenses = await getAllExpensesByGroup(group);
    } catch (error) {
      // TODO show error to load expenses
    }

    setData(
      expenses
        .map(expense => {
          const formatDate = format(new Date(expense.date), t('DATE_FORMAT'));
          const line = [expense.type, expense.name.trim(), expense.value, formatDate, expense.labelName].join(
            separator
          );
          if (expense.comments) {
            return `${line}${separator}${expense.comments.trim()}`;
          }
          return line;
        })
        .join('\n')
    );

    setLoading(false);
  }, [group, separator, t]);

  const groupsOptions = useMemo(
    () =>
      groups.map(x => (
        <option key={x.id} value={x.id}>
          {x.name}
        </option>
      )),
    [groups]
  );

  return (
    <>
      <ItemHeaderComponent
        title={t('EXPORT_TITLE')}
        actionText={t('EXPORT')}
        onAction={handleOnAction}
        disableAction={isLoading}
      />
      <form>
        <div className="row justify-content-md-center">
          <div className="col-xs-12 col-sm-6">
            <label htmlFor="search-group">{t('GROUP')}</label>
            <select
              className="form-select"
              aria-label="Search by group"
              value={selectedGroup}
              onChange={handleOnChangeGroup}
              disabled={isLoading}
            >
              {groupsOptions}
            </select>
          </div>
          <div className="col-xs-12 col-sm-6">
            <label htmlFor="search-group">{t('SEPARATOR')}</label>
            <input
              type="text"
              className="form-control"
              onChange={handleOnChangeSeparator}
              value={separator}
              disabled={isLoading}
            />
          </div>
        </div>
        <label htmlFor="search-group">{t('EXPORT_DATA')}</label>
        <textarea className="form-control" rows={10} readOnly value={data} />
      </form>
    </>
  );
});
