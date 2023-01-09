'use client';

import { Expense, ExpenseType, Label } from '@budget4home/base';
import { B4hButton, B4hForm, B4hInput, B4hSelect } from '@budget4home/ui-components';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ExpenseClient } from '../../../../../clients/expenses';
import { useAuth } from '../../../../../contexts/auth';
import { B4hRoutes } from '../../../../../util/routes';
import { ExpensePreviewItems } from './previewItems';

interface ExpenseFormProps {
  expense?: Expense;
  labels: Label[];
  groupId: string;
}
export function ExpenseForm(props: ExpenseFormProps) {
  const { push } = useRouter();
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState<Expense[]>([]);

  const typeRef = useRef<HTMLSelectElement>();
  const nameRef = useRef<HTMLInputElement>();
  const valueRef = useRef<HTMLInputElement>();
  const dateRef = useRef<HTMLInputElement>();
  const labelRef = useRef<HTMLSelectElement>();

  const handleOnManage = async () => {
    // TODO validate name
    // TODO loading state

    const expense = {
      type: typeRef.current.value,
      name: nameRef.current.value,
      value: +valueRef.current.value,
      date: dateRef.current.value,
      label: props.labels.find(x => x.id === labelRef.current.value),
      groupId: props.groupId
    } as Expense;

    setLoading(true);
    try {
      if (!props.expense?.id) {
        await ExpenseClient.add(token, { ...expense });
      } else {
        await ExpenseClient.edit(token, {
          id: props.expense.id,
          ...expense
        });
      }
      push(`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.expenses}`);
    } catch {
      // TODO show error msg
    }
    setLoading(false);
  };

  const handleOnDelete = async () => {
    if (confirm('Are you sure?')) {
      setLoading(true);

      await ExpenseClient.delete(token, {
        id: props.expense.id,
        groupId: props.groupId
      });

      setLoading(false);
      push(`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.expenses}`);
    }
  };

  const handleOnPreviewAdd = () => {
    const expense = {
      id: props.expense?.id ?? uuidv4(),
      type: typeRef.current.value,
      name: nameRef.current.value,
      value: +valueRef.current.value,
      date: dateRef.current.value,
      label: props.labels.find(x => x.id === labelRef.current.value),
      groupId: props.groupId
    } as Expense;

    setPreview(x => [...x, expense]);
  };
  const handleOnPreviewDelete = (expenseId: string) => {
    setPreview(x => x.filter(y => y.id !== expenseId));
  };
  const handleOnPreviewSubmit = async () => {
    setLoading(true);
    try {
      for (let i = 0; i < preview.length; i++) {
        const { id, ...previewData } = preview[i];
        console.log(previewData);
        await ExpenseClient.add(token, previewData);
      }
      push(`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.expenses}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(true);
    }
  };

  const formLabel = (
    <>
      {props.expense?.id && <h3>Expense: {props.expense.id}</h3>}
      {!props.expense?.id && <h3>Add new expense</h3>}
    </>
  );
  const formFooter = [
    <>
      {!props.expense?.id && (
        <B4hButton key="preview" onClick={handleOnPreviewAdd} disabled={loading}>
          add
        </B4hButton>
      )}
      {!props.expense?.id && (
        <B4hButton key="action" onClick={handleOnManage} disabled={loading}>
          add and submit
        </B4hButton>
      )}
      {props.expense?.id && (
        <B4hButton key="action" onClick={handleOnManage} disabled={loading}>
          update
        </B4hButton>
      )}
      {props.expense?.id && (
        <B4hButton key="delete" onClick={handleOnDelete} disabled={loading}>
          delete
        </B4hButton>
      )}
    </>
  ];

  return (
    <>
      <B4hForm label={formLabel} footer={formFooter}>
        <B4hSelect
          id={'type'}
          ref={typeRef}
          defaultValue={props.expense?.type ?? ExpenseType.outcoming}
          options={[
            { key: ExpenseType.outcoming, value: ExpenseType.outcoming },
            { key: ExpenseType.incoming, value: ExpenseType.incoming }
          ]}
          label={'Type'}
        />

        <B4hInput id={'name'} ref={nameRef} defaultValue={props.expense?.name} label={'Name'} />

        <B4hInput
          id={'value'}
          type="number"
          ref={valueRef}
          defaultValue={props.expense?.value}
          label={'Value'}
        />

        <B4hInput
          id={'date'}
          type="date"
          ref={dateRef}
          defaultValue={format(
            props.expense?.date ? new Date(props.expense?.date) : new Date(),
            'yyyy-MM-dd'
          )}
          label={'Date'}
        />

        <B4hSelect
          id={'label'}
          ref={labelRef}
          defaultValue={props.expense?.label?.id ?? props.labels.at(0)?.id}
          options={props.labels.map(label => {
            return {
              key: label.id,
              value: label.name
            };
          })}
          label={'Label'}
        />
      </B4hForm>
      {!props.expense?.id && preview?.length > 0 && (
        <B4hForm
          key="preview"
          label={'Preview'}
          footer={<B4hButton onClick={handleOnPreviewSubmit}>submit</B4hButton>}
        >
          <h5>{ExpenseType.incoming}</h5>
          <ExpensePreviewItems
            expenses={preview.filter(x => x.type === ExpenseType.incoming)}
            onDelete={handleOnPreviewDelete}
          />
          <h5>{ExpenseType.outcoming}</h5>
          <ExpensePreviewItems
            expenses={preview.filter(x => x.type === ExpenseType.outcoming)}
            onDelete={handleOnPreviewDelete}
          />
        </B4hForm>
      )}
    </>
  );
}
