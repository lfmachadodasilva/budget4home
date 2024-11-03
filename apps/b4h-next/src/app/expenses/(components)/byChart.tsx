'use client';

import { ExpenseModel, LabelModel } from '@b4h/models';
import { sumBy } from 'lodash';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface ExpensesByChartProps {
  expenseByLabel: Record<string, ExpenseModel[]>;
  labelById: Record<string, LabelModel>;
}

const COLORS = [
  '#AEC6CF',
  '#FFB347',
  '#B39EB5',
  '#FF6961',
  '#77DD77',
  '#F49AC2',
  '#FFD1DC',
  '#CFCFC4',
  '#FDFD96',
  '#836953',
  '#779ECB',
  '#FFB347',
  '#DEA5A4',
  '#B19CD9',
  '#CB99C9'
];

export const B4hExpensesByChart = (props: ExpensesByChartProps) => {
  const data = Object.entries(props.expenseByLabel).map(([key, expenses]) => ({
    name: key,
    value: sumBy(expenses, 'value')
  }));

  const renderLabel = (entry: { name: string; percent: number; value: number }) =>
    entry.name + ' ' + (entry.percent * 100).toFixed(0) + '%';

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={600} height={600}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            labelLine
            label={renderLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
