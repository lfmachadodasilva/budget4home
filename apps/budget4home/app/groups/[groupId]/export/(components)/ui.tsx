'use client';

import { Expense, Group } from '@budget4home/base';
import { B4hButton, B4hForm, B4hSelect, B4hTextarea } from '@budget4home/ui-components';
import { format } from 'date-fns';
import { ChangeEvent, useState } from 'react';
import { copyToClipboard } from '../../../../../util/copyToClipboard';

interface ExportUiProps {
  expenses: Expense[];
  group: Group;
}

export const ExportUi = (props: ExportUiProps) => {
  const [value, setValue] = useState<string>(JSON.stringify(props.expenses, null, 2));
  const [type, setType] = useState<string>('json');

  const handleOnChangeType = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'csv') {
      const separator = '|';
      const csv = props.expenses
        .map(expense => {
          const line = [
            format(new Date(expense.date), 'yyyy-MM-dd'),
            expense.type,
            expense.name,
            expense.value,
            expense.label.name
          ];
          return line.join(separator);
        })
        .join('\n');

      setValue(csv);
      setType('csv');
    } else {
      setValue(JSON.stringify(props.expenses, null, 2));
      setType('json');
    }
  };

  const handleOnCopy = () => {
    copyToClipboard(value);
  };

  return (
    <B4hForm
      label={`Export - ${props.group.name}`}
      footer={<B4hButton onClick={handleOnCopy}>Copy to clipboard</B4hButton>}
    >
      <B4hSelect
        onChange={handleOnChangeType}
        label="type"
        defaultValue="json"
        options={[
          { key: 'json', value: 'json' },
          { key: 'csv', value: 'csv' }
        ]}
      />

      {type === 'csv' && (
        <p>
          Format:
          <strong>2022-12-31|incoming|Uo|200000|salary</strong>
        </p>
      )}
      <B4hTextarea value={value} disabled style={{ height: '200px', width: '100%' }} />
    </B4hForm>
  );
};
