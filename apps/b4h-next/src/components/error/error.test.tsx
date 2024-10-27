import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { B4hError } from './index';

describe('B4hError', () => {
  test('renders error message', () => {
    const page = render(<B4hError />);

    // Check if the div with the role of error is rendered
    expect(page.getByRole('error')).toBeInTheDocument();

    // Check if the heading is rendered with the correct text
    expect(page.getByRole('heading', { level: 1 })).toHaveTextContent('something went wrong 💩');

    // Check if the paragraph is rendered with the correct text
    expect(page.getByText('please try again')).toBeInTheDocument();
  });
});
