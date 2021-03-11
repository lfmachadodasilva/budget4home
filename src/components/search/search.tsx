import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import { GlobalContext } from '../../contexts/globalContext';

export const SearchComponent = memo(() => {
  const [t] = useTranslation();
  const history = useHistory();
  const global = useContext(GlobalContext);

  const [months] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const [group, setGroup] = useState<number>(global.group);
  const [month, setMonth] = useState<number>(global.month);
  const [year, setYear] = useState<number>(global.year);

  useEffect(() => {
    setGroup(global.group);
    setMonth(global.month);
    setYear(global.year);
  }, [global.group, global.month, global.year]);

  const groupsOptions = useMemo(
    () =>
      global.groups.map(x => (
        <option key={x.id} value={x.id}>
          {x.name}
        </option>
      )),
    [global.groups]
  );
  const monthsOptions = useMemo(
    () =>
      months.map(x => (
        <option key={'MONTH_' + x} value={x}>
          {t('MONTHS.' + x)}
        </option>
      )),
    [months, t]
  );
  const yearsOptions = useMemo(
    () =>
      global.years.map(x => (
        <option key={x} value={x}>
          {x}
        </option>
      )),
    [global.years]
  );

  const handleOnChangeGroup = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroup(+event.target.value);
  }, []);
  const handleOnChangeMonth = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(+event.target.value);
  }, []);
  const handleOnChangeYear = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(+event.target.value);
  }, []);
  const handleOnSearch = useCallback(() => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify({
        group: group,
        month: month,
        year: year
      })
    });
  }, [history, group, month, year]);

  return (
    <div className="mb-2">
      <form className="row">
        <div className="col-sm-12 col-md-4">
          <label htmlFor="search-group">{t('GROUP')}</label>
          <select
            key={Math.random()}
            className="form-select"
            aria-label="Search by group"
            value={group}
            onChange={handleOnChangeGroup}
          >
            {groupsOptions}
          </select>
        </div>
        <div className="col-sm-12 col-md-4">
          <label htmlFor="search-group">{t('MONTH')}</label>
          <select className="form-select" aria-label="Search by month" value={month} onChange={handleOnChangeMonth}>
            {monthsOptions}
          </select>
        </div>
        <div className="col-sm-12 col-md-4">
          <label htmlFor="search-group">{t('YEAR')}</label>
          <select className="form-select" aria-label="Search by year" value={year} onChange={handleOnChangeYear}>
            {yearsOptions}
          </select>
        </div>
      </form>
      <div className="d-flex justify-content-end mt-2">
        <button type="button" className="btn btn-primary" onClick={handleOnSearch}>
          {t('SEARCH')}
        </button>
      </div>
    </div>
  );
});
