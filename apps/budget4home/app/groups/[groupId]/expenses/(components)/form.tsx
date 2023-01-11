'use client';

import { Expense, ExpenseType, Label } from '@budget4home/base';
import { B4hButton, B4hForm, B4hInput, B4hSelect, B4hTextarea } from '@budget4home/ui-components';
import { addMonths, format } from 'date-fns';
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
  const commentsRef = useRef<HTMLTextAreaElement>();
  const autoRef = useRef<HTMLSelectElement>();

  const isEditMode = () => {
    return !!props.expense?.id;
  };
  const isAddMode = () => {
    return !props.expense?.id;
  };

  const isFieldsValid = () => {
    if (!nameRef.current?.value || !valueRef.current.value) {
      alert('Name and value fields can not be empty');
      return false;
    }

    if (+valueRef.current.value <= 0) {
      alert('Value can not be zero or negative');
      return false;
    }

    return true;
  };

  const handleOnManage = async () => {
    // TODO validate name
    // TODO loading state

    if (!isFieldsValid()) {
      return;
    }

    const expense = {
      type: typeRef.current.value,
      name: nameRef.current.value,
      value: +valueRef.current.value,
      date: dateRef.current.value,
      label: props.labels.find(x => x.id === labelRef.current.value),
      comments: commentsRef.current.value,
      groupId: props.groupId
    } as Expense;

    setLoading(true);
    try {
      if (isAddMode()) {
        let parent: Expense = null;
        for (let i = 0; i < +autoRef.current.value; i++) {
          await ExpenseClient.add(token, {
            ...expense,
            parent: parent,
            date: addMonths(new Date(dateRef.current.value), i).toISOString(),
            scheduled: +autoRef.current.value > 1 ? `${i + 1}/${autoRef.current.value}` : null
          });
          if (i === 0) {
            parent = expense;
          }
        }
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
    if (!isFieldsValid()) {
      return;
    }

    for (let i = 0; i < +autoRef.current.value; i++) {
      const expense = {
        id: uuidv4(),
        type: typeRef.current.value,
        name: nameRef.current.value,
        value: +valueRef.current.value,
        date: addMonths(new Date(dateRef.current.value), i).toISOString(),
        label: props.labels.find(x => x.id === labelRef.current.value),
        comments: commentsRef.current.value,
        groupId: props.groupId,
        scheduled: +autoRef.current.value > 1 ? `${i + 1}/${autoRef.current.value}` : null
      } as Expense;

      setPreview(x => [...x, expense]);
    }
  };
  const handleOnPreviewDelete = (expenseId: string) => {
    setPreview(x => x.filter(y => y.id !== expenseId));
  };
  const handleOnPreviewSubmit = async () => {
    setLoading(true);
    try {
      let parent: Expense = null;
      for (let i = 0; i < preview.length; i++) {
        const { id, ...previewData } = preview[i];
        const newExpense = await ExpenseClient.add(token, {
          ...previewData,
          parent: parent
        });

        if (i === 0) {
          parent = await newExpense.json();
        }
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
      {isEditMode() && <h3>Expense: {props.expense.id}</h3>}
      {isAddMode() && <h3>Add new expense</h3>}
    </>
  );
  const formFooter = [
    <>
      {isAddMode() && (
        <>
          <B4hButton key="preview" onClick={handleOnPreviewAdd} disabled={loading}>
            add
          </B4hButton>
          <B4hButton key="action" onClick={handleOnManage} disabled={loading}>
            add and submit
          </B4hButton>
        </>
      )}

      {isEditMode() && (
        <>
          <B4hButton key="action" onClick={handleOnManage} disabled={loading}>
            update
          </B4hButton>
          <B4hButton key="delete" onClick={handleOnDelete} disabled={loading}>
            delete
          </B4hButton>
        </>
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

        {isEditMode() && props.expense?.scheduled && (
          <B4hInput
            disabled
            id="scheduled"
            label="Scheduled"
            defaultValue={props.expense?.scheduled}
          />
        )}

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
              value: `${label.icon ?? ''} ${label.name}`
            };
          })}
          label={'Label'}
        />

        <B4hTextarea
          id={'comments'}
          ref={commentsRef}
          defaultValue={props.expense?.comments}
          label={'Comments'}
          sublabel={'(optional)'}
        />

        {isAddMode() && (
          <B4hSelect
            id={'auto'}
            ref={autoRef}
            defaultValue={'1'}
            options={Array.from(Array(12).keys()).map((_, index: number) => {
              return {
                key: (index + 1).toString(),
                value: `${index === 0 ? 'Current month' : (index + 1).toString() + '+ months'}`
              };
            })}
            label={'Auto generate'}
          />
        )}
      </B4hForm>
      {isAddMode() && preview?.length > 0 && (
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
