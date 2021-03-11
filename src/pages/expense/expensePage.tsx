import { memo } from 'react';
import { SearchComponent } from '../../components/search/search';

export const ExpensePage = memo(() => {
  return (
    <>
      <SearchComponent />
      <br></br>
      Expense page
    </>
  );
});
