import { B4hSelect, B4hSelectProps } from '@b4h/web-components';

export enum B4hViewByType {
  byDate = 'byDate',
  byLabel = 'byLabel'
}

export interface B4hViewByProps extends B4hSelectProps {}

export const B4hViewBy = (props: B4hViewByProps) => {
  const { defaultValue, ...propsCopy } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // if (event.target.value) {
    //   const searchParam = new URLSearchParams({
    //     ...Object.fromEntries(searchParams.entries()),
    //     viewBy: event.target.value
    //   });
    //   push(`${B4hRoutes.expenses}?${searchParam.toString()}`);
    // } else {
    //   push(B4hRoutes.expenses);
    // }
  };

  return (
    <B4hSelect
      {...propsCopy}
      onChange={handleOnChange}
      defaultValue={defaultValue ?? B4hViewByType.byDate}
    >
      {Object.values(B4hViewByType).map(value => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </B4hSelect>
  );
};
