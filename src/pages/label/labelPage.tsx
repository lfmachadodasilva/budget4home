import { memo } from 'react';
import { SearchComponent } from '../../components/search/search';

export const LabelPage = memo(() => {
  return (
    <>
      <SearchComponent />
      <br></br>
      Label page
    </>
  );
});
