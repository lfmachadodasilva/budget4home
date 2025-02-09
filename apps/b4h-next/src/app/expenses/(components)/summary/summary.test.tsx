import '@testing-library/jest-dom';

import { ExpenseModel, ExpenseType } from '@b4h/models';
import { render } from '@testing-library/react';
import { B4hExpenseSummary } from './index';

const localStorageMock = {
  getItem: jest.fn().mockImplementation(() => 'true')
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.localStorage = localStorageMock as any;

describe('B4hExpenseSummary', () => {
  const expenses = [
    { id: '1', name: 'Expense 1', value: 100, type: ExpenseType.outcoming, date: new Date() },
    { id: '2', name: 'Expense 2', value: 200, type: ExpenseType.outcoming, date: new Date() },
    { id: '3', name: 'Income 1', value: 500, type: ExpenseType.incoming, date: new Date() }
  ] as ExpenseModel[];

  test('renders total used, left and percentage correctly', () => {
    const { getByText, getByTestId } = render(<B4hExpenseSummary expenses={expenses} />);

    expect(getByText('Total used:')).toBeInTheDocument();
    expect(getByText('Total left:')).toBeInTheDocument();
    expect(getByTestId('total-used')).toHaveTextContent('3');
    expect(getByTestId('total-left')).toHaveTextContent('2');
    expect(getByTestId('total-perc')).toHaveTextContent('40%');
  });

  test('renders negative percentage with correct style', () => {
    const negativeExpenses = [
      { id: '1', name: 'Expense 1', value: 600, type: ExpenseType.outcoming, date: new Date() },
      { id: '2', name: 'Income 1', value: 500, type: ExpenseType.incoming, date: new Date() }
    ] as ExpenseModel[];

    const { getByTestId } = render(<B4hExpenseSummary expenses={negativeExpenses} />);

    const percentageElement = getByTestId('total-perc');
    expect(percentageElement).toBeInTheDocument();
    expect(percentageElement).toHaveTextContent('-20%');
    expect(percentageElement).toHaveClass('negative');
  });
});
