import { ExpenseModel, LabelModel } from '@b4h/models';

export const expenses = [
  {
    id: '1',
    name: 'expense 1',
    label: 'label1',
    value: 100,
    date: new Date()
  },
  {
    id: '2',
    name: 'expense 2',
    label: 'label2',
    value: 200,
    date: new Date()
  },
  {
    id: '3',
    name: 'expense 3',
    label: 'label3',
    value: 300,
    date: new Date()
  }
] as ExpenseModel[];
export const labels = [
  {
    id: 'label1',
    name: 'label1',
    icon: '🚀'
  },
  {
    id: 'label2',
    name: 'label2',
    icon: '✅'
  },
  {
    id: 'label3',
    name: 'label3',
    icon: '🛒'
  }
] as LabelModel[];
