import { Label } from '@budget4home/base';
import { ImportItem, ImportItemStatus } from './ui';

export const splitItems = (value: string, labels: Label[], groupId: string) => {
  const newData: ImportItem[] = [];

  value.split('\n').forEach(row => {
    const cols = row.split('|');

    const label = labels.find(x => x.name.trim() === cols[4].trim());

    // 2022-12-31|incoming|Uo|200000|salary;
    newData.push({
      date: cols[0],
      type: cols[1],
      name: cols[2],
      value: +cols[3],
      label: label ?? { name: cols[4].trim() },
      groupId: groupId,
      status: ImportItemStatus.new
    } as ImportItem);
  });

  return newData;
};
