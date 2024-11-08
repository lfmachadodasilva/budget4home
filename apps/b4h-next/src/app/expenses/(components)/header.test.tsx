import '@testing-library/jest-dom';

import { MONTH_FORMAT } from '@/utils/constants';
import { B4hRoutes } from '@/utils/routes';
import { fireEvent, render } from '@testing-library/react';
import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { B4hExpensesHeader } from './header';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn()
}));

describe('B4hExpensesHeader', () => {
  const mockPush = jest.fn();
  const mockSearchParams = new URLSearchParams({
    year: '2023',
    month: '01',
    viewBy: 'byDate'
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with empty query', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    const page = render(<B4hExpensesHeader />);

    expect(page.getByLabelText('month')).toHaveProperty('value', format(new Date(), MONTH_FORMAT));
    expect(page.getByLabelText('view by')).toHaveProperty('value', 'byDate');
  });

  test('renders correctly with initial values', () => {
    const page = render(<B4hExpensesHeader />);

    expect(page.getByLabelText('month')).toHaveProperty(
      'value',
      format(new Date(2023, 0, 1), MONTH_FORMAT)
    );
    expect(page.getByLabelText('view by')).toHaveProperty('value', 'byDate');
  });

  test('handles month change', () => {
    const page = render(<B4hExpensesHeader />);

    fireEvent.change(page.getByLabelText('month'), { target: { value: '2023-02' } });

    expect(mockPush).toHaveBeenCalledWith(`${B4hRoutes.expenses}?year=2023&month=02&viewBy=byDate`);
  });

  test.each([['byDate'], ['byLabel'], ['byChart']])(
    'handles view by change to %s',
    async (viewBy: string) => {
      const page = render(<B4hExpensesHeader />);

      fireEvent.change(page.getByLabelText('view by'), { target: { value: viewBy } });

      expect(mockPush).toHaveBeenCalledWith(
        `${B4hRoutes.expenses}?year=2023&month=01&viewBy=${viewBy}`
      );
    }
  );
});
