import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { B4hSeparator } from './index';
import styles from './separator.module.scss';

describe('B4hSeparator', () => {
  test('renders separator with correct class', () => {
    const page = render(<B4hSeparator />);

    // Check if the div with the correct class name is rendered
    expect(page.getByRole('separator')).toHaveClass(styles.container);
  });
});
