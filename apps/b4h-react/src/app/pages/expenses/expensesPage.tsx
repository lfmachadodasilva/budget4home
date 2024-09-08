import { ExpenseModel, LabelModel } from '@b4h/models';
import {
  B4hButton,
  B4hPageLayout,
  B4hPageLayoutActions,
  B4hPageLayoutContent,
  B4hPageLayoutTitle,
  B4hSelect
} from '@b4h/web-components';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { B4hLoading } from '../../components/loading/loading';
import { B4hPageTitle } from '../../components/pageTitle';
import { useB4hExpeses } from '../../providers/expensesProvider';
import { useB4hLabels } from '../../providers/labelsProvider';
import { B4hRoutes } from '../../shared/routes';
import styles from './expensesPage.module.scss';
import { B4hMonthPicker } from './monthPicker/monthPicker';
import { ViewByDate } from './viewBy/viewByDate';
import { ViewByLabel } from './viewBy/viewByLabel';

export const ExpensesPage = () => {
  const { query: labelsQuery } = useB4hLabels();
  const { query: expensesQuery } = useB4hExpeses();

  const [viewBy, setViewBy] = useState<string>('byDate');

  const handleViewBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setViewBy(event.target.value);
  };

  const expenses = expensesQuery?.data as ExpenseModel[];
  const loading = expensesQuery?.isLoading;
  const labels = labelsQuery?.data as LabelModel[];

  return (
    <>
      <B4hPageTitle>home | expenses</B4hPageTitle>

      <B4hPageLayout>
        <B4hPageLayoutTitle>expenses</B4hPageLayoutTitle>
        <B4hPageLayoutActions>
          <Link to={B4hRoutes.expensesAdd}>
            <B4hButton>add</B4hButton>
          </Link>
        </B4hPageLayoutActions>
        <B4hPageLayoutContent>
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
        </B4hPageLayoutContent>
      </B4hPageLayout>
    </>
  );
};
