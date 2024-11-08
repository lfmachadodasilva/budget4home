import { fetchExpenses } from '@/clients/expenses';
import { fetchLabels } from '@/clients/labels';
import { b4hSession } from '@/utils/session';
import { ExpenseModel, ExpenseType, LabelModel } from '@b4h/models';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { B4hExpensesItems } from './items';

const intersectionObserverMock = () => ({
  observe: () => null
});
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

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

  test.each([['byDate'], ['byLabel']])(
    'renders expense summary items by %s',
    async (viewBy: string) => {
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
    }
  );
});
