import { ExpenseModel, LabelModel } from '@b4h/models';
import { B4hButton, B4hDialog, B4hPageLayout, B4hSelect } from '@b4h/web-components';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { B4hLoading } from '../../components/loading/loading';
import { B4hPageTitle } from '../../components/pageTitle';
import { useB4hExpeses } from '../../providers/expensesProvider';
import { useB4hLabels } from '../../providers/labelsProvider';
import styles from './expensesPage.module.scss';
import { B4hMonthPicker } from './monthPicker/monthPicker';
import { ViewByDate } from './viewBy/viewByDate';
import { ViewByLabel } from './viewBy/viewByLabel';

export const ExpensesPage = () => {
  const { query: labelsQuery } = useB4hLabels();
  const { query: expensesQuery } = useB4hExpeses();
  const [searchParams, setSearchParams] = useSearchParams();

  const expenses = expensesQuery?.data as ExpenseModel[];
  const loading = expensesQuery?.isLoading;
  const labels = labelsQuery?.data as LabelModel[];

  const [viewBy, setViewBy] = useState<string>('byDate');
  const [openDialog, setOpenDialog] = useState<{ open: boolean; expense: ExpenseModel | null }>({
    open: false,
    expense: null
  });

  const handleViewBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setViewBy(event.target.value);
  };

  const handleOpenDialog = () => {
    setOpenDialog({ open: true, expense: null });
  };
  const handleCloseDialog = (open: boolean) => {
    if (!open) {
      setOpenDialog({ open: false, expense: null });
      setSearchParams({});
    }
  };

  useEffect(() => {
    if (searchParams.has('expense')) {
      const expenseId = searchParams.get('expense');
      const expense = expenses.find(expense => expense.id === expenseId);
      if (expense) {
        setOpenDialog({ open: true, expense });
      }
    }
  }, [searchParams]);

  return (
    <>
      <B4hPageTitle>home | expenses</B4hPageTitle>

      <B4hPageLayout.Root>
        <B4hPageLayout.Title>expenses</B4hPageLayout.Title>
        <B4hPageLayout.Actions>
          <B4hButton onClick={handleOpenDialog}>add</B4hButton>
        </B4hPageLayout.Actions>
        <B4hPageLayout.Content>
          <B4hMonthPicker className={styles.monthPicker} type="month" widthFit />
          <B4hSelect
            defaultValue={viewBy}
            widthFit
            onChange={handleViewBy}
            className={styles.viewBy}
          >
            <option value={'byDate'} key={'byDate'}>
              by date
            </option>
            <option value={'byLabel'} key={'byLabel'}>
              by label
            </option>
          </B4hSelect>

          {loading && <B4hLoading />}
          {!loading && expenses.length === 0 && <p>no expenses</p>}
          {!loading && expenses.length > 1 && viewBy === 'byDate' && (
            <ViewByDate expenses={expenses} labels={labels} />
          )}
          {!loading && expenses.length > 1 && viewBy === 'byLabel' && (
            <ViewByLabel expenses={expenses} labels={labels} />
          )}
        </B4hPageLayout.Content>
      </B4hPageLayout.Root>
      <B4hDialog
        open={openDialog.open}
        onOpenChange={handleCloseDialog}
        title={openDialog.expense ? 'update expense' : 'add expense'}
        description={openDialog.expense ? 'update expense' : 'add expense'}
      >
        {JSON.stringify(openDialog.expense)}
      </B4hDialog>
    </>
  );
};
