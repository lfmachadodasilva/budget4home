import '@testing-library/jest-dom';

import { fetchExpenses } from '@/clients/expenses';
import { fetchLabels } from '@/clients/labels';
import { b4hSession } from '@/utils/session';
import { ExpenseModel, ExpenseType, LabelModel } from '@b4h/models';
import { render } from '@testing-library/react';
import { B4hExpensesItems } from './items';

const intersectionObserverMock = () => ({
  observe: () => null
});
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
window.ResizeObserver = jest.fn().mockImplementation(intersectionObserverMock);

jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ResponsiveContainer: (props: any) => <div {...props} />
}));

jest.mock('@/clients/expenses');
jest.mock('@/clients/labels');
jest.mock('@/utils/session');

describe('B4hExpensesItems', () => {
  const mockFetchExpenses = fetchExpenses as jest.MockedFunction<typeof fetchExpenses>;
  const mockFetchLabels = fetchLabels as jest.MockedFunction<typeof fetchLabels>;
  const mockB4hSession = b4hSession as jest.MockedFunction<typeof b4hSession>;

  beforeAll(() => {
    mockFetchLabels.mockResolvedValue([
      {
        id: 'label1',
        name: 'Label 1',
        icon: '🏷️'
      }
    ] as LabelModel[]);
    mockFetchExpenses.mockResolvedValue([
      {
        id: 'expense1',
        name: 'Expense 1',
        value: 100,
        label: 'label1',
        type: ExpenseType.outcoming,
        date: new Date()
      },
      {
        id: 'expense2',
        name: 'Expense 2',
        value: 200,
        label: 'label1',
        type: ExpenseType.outcoming,
        date: new Date()
      },
      {
        id: 'expense3',
        name: 'Expense 3',
        value: 330,
        label: 'label1',
        type: ExpenseType.outcoming,
        date: new Date()
      }
    ] as ExpenseModel[]);
  });

  beforeEach(() => {
    mockB4hSession.mockReturnValue({
      getFavoriteGroupId: jest
        .fn()
        .mockResolvedValue({ groupId: 'test-group-id', userId: 'test-user-id' }),
      getUserId: jest.fn().mockResolvedValue('test-user-id')
    });
  });

  test.each([['byDate'], ['byLabel']])('renders expense items by %s', async (viewBy: string) => {
    const props = { month: '01', year: '2023', viewBy: viewBy };
    const page = render(await B4hExpensesItems(props));

    // page.debug();

    expect(page.getByText('🏷️ Expense 1')).toBeInTheDocument();
    expect(page.getByText('🏷️ Expense 2')).toBeInTheDocument();
    expect(page.getByText('🏷️ Expense 3')).toBeInTheDocument();

    expect(page.getByTestId('expense1-value')).toHaveTextContent('1');
    expect(page.getByTestId('expense2-value')).toHaveTextContent('2');
    expect(page.getByTestId('expense3-value')).toHaveTextContent('3.3');

    expect(page.getByTestId('expense1-link')).toHaveProperty(
      'href',
      expect.stringContaining(`/expenses/expense1?month=01&year=2023&viewBy=${viewBy}`)
    );
    expect(page.getByTestId('expense2-link')).toHaveProperty(
      'href',
      expect.stringContaining(`/expenses/expense2?month=01&year=2023&viewBy=${viewBy}`)
    );
    expect(page.getByTestId('expense3-link')).toHaveProperty(
      'href',
      expect.stringContaining(`/expenses/expense3?month=01&year=2023&viewBy=${viewBy}`)
    );
  });

  test('render expense items header grouped by date', async () => {
    const props = { month: '01', year: '2023', viewBy: 'byDate' };
    const page = render(await B4hExpensesItems(props));

    // page.debug();

    expect(page.getByTestId('expense-group-header-key')).toHaveTextContent('2024-11-08');
    expect(page.getByTestId('expense-group-header-value')).toHaveTextContent('6.30');
  });

  test('render expense items header grouped by label', async () => {
    const props = { month: '01', year: '2023', viewBy: 'byLabel' };
    const page = render(await B4hExpensesItems(props));

    // page.debug();

    expect(page.getByTestId('expense-group-header-key')).toHaveTextContent('🏷️ Label 1');
    expect(page.getByTestId('expense-group-header-value')).toHaveTextContent('6.30');
  });

  test('renders expense items by chart', async () => {
    const props = { month: '01', year: '2023', viewBy: 'byChart' };
    const { container } = render(await B4hExpensesItems(props));

    expect(container.querySelector('.recharts-wrapper')).toBeInTheDocument();
  });
});
