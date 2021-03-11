import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const SearchComponent = memo(() => {
  const [t] = useTranslation();

  const [months] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

  const groupsOptions = useMemo(() => {
    return (
      <>
        <option value="0">Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </>
    );
  }, []);
  const monthsOptions = useMemo(
    () =>
      months.map(x => (
        <option key={'MONTH_' + x} value={x}>
          {t('MONTHS.' + x)}
        </option>
      )),
    [months, t]
  );

  return (
    <div className="mb-2">
      <form className="row">
        <div className="col-sm-12 col-md-4">
          <label htmlFor="search-group">{t('GROUP')}</label>
          <select className="form-select" aria-label="Default select example" value={'1'}>
            {groupsOptions}
          </select>
        </div>
        <div className="col-sm-12 col-md-4">
          <label htmlFor="search-group">{t('MONTH')}</label>
          <select className="form-select" aria-label="Default select example" value={'1'}>
            {monthsOptions}
          </select>
        </div>
        <div className="col-sm-12 col-md-4">
          <label htmlFor="search-group">{t('YEAR')}</label>
          <select className="form-select" aria-label="Default select example" value={'1'}>
            <option value="0">Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </form>
    </div>
  );
});
