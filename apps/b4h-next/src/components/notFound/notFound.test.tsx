import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { B4hNotFound } from './index';

describe('B4hNotFound', () => {
  test('renders not found message', () => {
    const page = render(<B4hNotFound />);

    // Check if the heading is rendered with the correct text
    expect(page.getByRole('heading', { level: 1 })).toHaveTextContent('not found');

    // Check if the paragraph is rendered with the correct text
    expect(
      page.getByText('sorry, the page you are looking for does not exist.')
    ).toBeInTheDocument();
  });
});
