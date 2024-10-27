import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { B4hLoading, B4hLoadingLogo } from './index';

describe('components>loading', () => {
  describe('B4hLoading', () => {
    test('renders B4hLoadingLogo component', () => {
      const page = render(<B4hLoading />);
      const logoElement = page.getByAltText('loading');
      expect(logoElement).toBeInTheDocument();
    });
  });

  describe('B4hLoadingLogo', () => {
    test('renders with default size', () => {
      const page = render(<B4hLoadingLogo />);
      const logoElement = page.getByAltText('loading');
      expect(logoElement).toHaveAttribute('width', '64');
      expect(logoElement).toHaveAttribute('height', '64');
    });

    test('renders with given size', () => {
      const page = render(<B4hLoadingLogo size={128} />);
      const logoElement = page.getByAltText('loading');
      expect(logoElement).toHaveAttribute('width', '128');
      expect(logoElement).toHaveAttribute('height', '128');
    });
  });
});
