export interface LabelModel {
  id: number;
  name: string;
}

export interface LabelFullModel {
  id: number;
  name: string;

  currValue: number;
  lastValue: number;
  avgValue: number;
}

export const defaultLabelModel: LabelModel[] = [
  {
    id: 1,
    name: 'Label 1'
  },
  {
    id: 2,
    name: 'Label 2'
  },
  {
    id: 3,
    name: 'Label 3'
  }
];

const getRandom = () => Math.random() * 1000 + 1;

export const defaultLabelFullModel: LabelFullModel[] = [
  {
    id: 1,
    name: 'Label 1',
    currValue: getRandom(),
    lastValue: getRandom(),
    avgValue: getRandom()
  },
  {
    id: 2,
    name: 'Label 2',
    currValue: getRandom(),
    lastValue: getRandom(),
    avgValue: getRandom()
  },
  {
    id: 3,
    name: 'Label 3',
    currValue: getRandom(),
    lastValue: getRandom(),
    avgValue: getRandom()
  }
];
