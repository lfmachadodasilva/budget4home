import { B4hInput, B4hInputProps } from '@b4h/web-components';
import { format } from 'date-fns';
import { ChangeEvent } from 'react';
import { useB4hExpeses } from '../../../providers/expensesProvider';

export interface B4hMonthPickerProps extends B4hInputProps {}

export const B4hMonthPicker = (props: B4hMonthPickerProps) => {
  const { setDate, date } = useB4hExpeses();
  const { onChange, ...copyProps } = props;

  const handleMonthPicker = (event: ChangeEvent<HTMLInputElement>) => {
    const year = event.target.value.split('-')[0];
    const month = event.target.value.split('-')[1];
    setDate(new Date(+year, +month - 1));
  };

  return (
    <B4hInput
      {...copyProps}
      required
      onChange={handleMonthPicker}
      type="month"
      defaultValue={format(date, 'yyyy-MM')}
    />
  );
};
