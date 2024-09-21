import { B4hPageLayout } from '@b4h/web-components';
import { B4hPageTitle } from '../components/pageTitle';

export const HomePage = () => {
  return (
    <>
      <B4hPageTitle>home | budget4home</B4hPageTitle>
      <B4hPageLayout.Root>
        <B4hPageLayout.Title>home</B4hPageLayout.Title>
        <B4hPageLayout.Content>
          <p>home</p>
        </B4hPageLayout.Content>
      </B4hPageLayout.Root>
    </>
  );
};
