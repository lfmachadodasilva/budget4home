'use client';

import { Expense, Group, Label } from '@budget4home/base';
import { B4hButton, B4hForm, B4hTextarea } from '@budget4home/ui-components';
import { useCallback, useRef, useState } from 'react';
import { LabelClient } from '../../../../../clients';
import { ExpenseClient } from '../../../../../clients/expenses';
import { useAuth } from '../../../../../contexts/auth';
import { splitItems } from './split';
import { ImportTable } from './table';

export const ImportItemStatus = {
  new: 'New',
  processing: 'Processing',
  done: 'Done',
  addLabel: 'Add Label',
  addLabelFail: 'fail add Label',
  fail: 'Fail'
};

export interface ImportItem extends Expense {
  status: string;
}

interface ImportUiProps {
  labels: Label[];
  group: Group;
}

export const ImportUi = (props: ImportUiProps) => {
  const { token } = useAuth();
  const dataRef = useRef<HTMLTextAreaElement>();
  const [data, setData] = useState<ImportItem[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleOnProcess = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setError(null);
      setData(splitItems(event.target.value, props.labels, props.group.id));
    } catch {
      setError('Fail to process your data');
      setData([]);
    }
  };

  const handleOnImport = useCallback(async () => {
    const dataCopy = [...data];
    setLoading(true);

    // create all labels that does not exist
    for (let i = 0; i < data.length; i++) {
      if (dataCopy[i].label.id) {
        continue;
      }

      // update table
      dataCopy[i].status = ImportItemStatus.addLabel;
      setData(dataCopy);

      let newLabel: Label;

      try {
        const response = await LabelClient.add(token, {
          name: dataCopy[i].label.name,
          groupId: dataCopy[i].groupId
        });
        newLabel = await response.json();
      } catch (err) {
        console.log(err);
        // update table
        dataCopy[i].status = ImportItemStatus.addLabelFail;
        setData(dataCopy);
        continue;
      }

      // update base labels
      newLabel = { ...newLabel, name: dataCopy[i].label.name };
      props.labels.push(newLabel);

      // update the others fiels with the new label
      for (let j = i; j < data.length; j++) {
        if (dataCopy[j].label.id) {
          continue;
        }

        if (dataCopy[j].label.name === newLabel.name) {
          dataCopy[j].label.id = newLabel.id;
          dataCopy[j].label.groupId = newLabel.groupId;
        }
      }

      // update table
      setData(dataCopy);
    }

    // add all expenses
    for (let i = 0; i < data.length; i++) {
      // update table
      dataCopy[i].status = ImportItemStatus.processing;
      setData(dataCopy);

      try {
        await ExpenseClient.add(token, dataCopy[i]);
      } catch (err) {
        // update table
        dataCopy[i].status = ImportItemStatus.fail;
        setData(dataCopy);
        continue;
      }

      // update table
      dataCopy[i].status = ImportItemStatus.done;
      setData(dataCopy);
    }

    setLoading(false);
  }, [token, data]);

  const formFooter = (
    <B4hButton onClick={handleOnImport} disabled={loading}>
      import
    </B4hButton>
  );

  return (
    <>
      <B4hForm label={'Import'} footer={formFooter}>
        <B4hTextarea
          ref={dataRef}
          style={{ height: '200px', width: '100%' }}
          rows={5}
          onChange={handleOnProcess}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </B4hForm>
      <p>
        Format:
        <strong>2022-12-31|incoming|Uo|200000|salary</strong>
      </p>
      <ImportTable items={data} />
    </>
  );
};

/* 
2022-12-31|incoming|Uo|200000|salary
2022-12-27|outcoming|luiz|2|home 
2022-12-23|outcoming|bebidinha|100000|market
2022-12-27|outcoming|Sainsbury's |1000|market
2023-01-02|outcoming|oub|20000|🍻
2022-12-30|incoming|Sojo|9000|salary
2022-12-27|outcoming|Cabelo|5000|general
2022-12-27|incoming|Dojo|10000|💰
2022-12-28|outcoming|test|10|market
2023-01-01|outcoming|copa|20000|pub
2022-12-30|outcoming|Bebidinha|1000|pub
2022-12-27|outcoming|bla|200|home 

2023-03-03|incoming|Uo|200000|salary
2023-03-03|outcoming|luiz|2|home 
2023-03-03|outcoming|bebidinha|100000|market
2023-03-03|outcoming|Sainsbury's |1000|market
2023-03-03|outcoming|oub|20000|🍻
2023-03-03|incoming|Sojo|9000|salary
2023-03-03|outcoming|Cabelo|5000|general
2023-03-03|incoming|Dojo|10000|💰
2023-03-03|outcoming|test|10|market
2023-03-03|outcoming|copa|20000|pub
2023-03-03|outcoming|Bebidinha|1000|pub
2023-03-03|outcoming|bla|200|home 
*/
