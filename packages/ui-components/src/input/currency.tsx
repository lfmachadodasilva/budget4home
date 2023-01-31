'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { B4hInput } from '.';

interface B4hInputCurrencyProp {
  label?: string;
  sublabel?: string;
  value: number;
  setValue: (value: number) => void;
}

export const B4hInputCurrency = (props: B4hInputCurrencyProp) => {
  const [value, setValue] = useState<string>();

  const { setValue: setValueProps, value: valueProps, ...propsCopy } = props;

  useEffect(() => {
    value && setValueProps(+value);
  }, [value]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const v = event.target.value;

    function roundToTwo(num: any) {
      return +(Math.round((num + 'e+2') as any) + 'e-2');
    }

    if (v.includes('.')) {
      // check for amount of decimals
      const converted = parseFloat(v);

      if (v.length > value.length) {
        setValue(roundToTwo(converted * 10).toString());
      } else {
        setValue(roundToTwo(converted / 10).toString());
      }
    } else if (v.length > 2) {
      setValue((+v / 100).toString());
    } else {
      setValue(v);
    }
  };

  return (
    <>
      <B4hInput
        {...propsCopy}
        value={props.value?.toString() ?? ''}
        onChange={handleOnChange}
        label={props.label}
        sublabel={props.sublabel}
        type="number"
        step="1.00"
        inputMode="tel"
      />
    </>
  );
};
