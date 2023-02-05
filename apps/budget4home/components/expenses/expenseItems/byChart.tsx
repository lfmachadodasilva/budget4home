'use client';

import 'chart.js/auto';

import { Expense } from '@budget4home/base';
import { Pie } from 'react-chartjs-2';
import { expensesByLabel } from '../../../util/expenses';

// Chart.register(Colors);

export interface ExpensesByChart {
  expenses: Expense[];
  groupId: string;
}

export const ExpensesByChart = (props: ExpensesByChart) => {
  const byLabel = expensesByLabel(props.expenses, 'sum');

  const chartData = {
    labels: byLabel.map(x => `${x.label.icon} ${x.label.name}`),
    datasets: [
      {
        data: byLabel.map(x => x.total),
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="chart-container">
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false
            },
            legend: {
              position: 'bottom',
              labels: {
                font: {
                  size: 16
                }
              }
            }
          }
        }}
      />
    </div>
  );
};
