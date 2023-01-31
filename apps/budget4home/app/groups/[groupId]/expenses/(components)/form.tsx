'use client';

import { Expense, ExpenseType, Label } from '@budget4home/base';
import {
  B4hButton,
  B4hForm,
  B4hInput,
  B4hInputCurrency,
  B4hSelect,
  B4hTextarea
} from '@budget4home/ui-components';
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
  const [value, setValue] = useState<number>();

  const [preview, setPreview] = useState<Expense[]>([]);

  const typeRef = useRef<HTMLSelectElement>();
  const nameRef = useRef<HTMLInputElement>();
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
    if (!nameRef.current?.value || !value) {
      alert('Name and value fields can not be empty');
      return false;
    }

    if (value <= 0) {
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
      value: value,
      date: dateRef.current.value,
      label: props.labels.find(x => x.id === labelRef.current.value),
      comments: commentsRef.current.value,
      scheduled: props.expense?.scheduled
    } as Expense;

    setLoading(true);
    try {
      if (isAddMode()) {
        let parent: Expense = null;
        for (let i = 0; i < +autoRef.current.value; i++) {
          const newExpense = await ExpenseClient.add(token, props.groupId, {
            ...expense,
            parent: parent,
            date: addMonths(new Date(dateRef.current.value), i).toISOString(),
            scheduled: +autoRef.current.value > 1 ? `${i + 1}/${autoRef.current.value}` : null
          });
          if (i === 0) {
            parent = await newExpense.json();
          }
        }
      } else {
        await ExpenseClient.edit(token, props.groupId, {
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
    if (!props.expense.parent && props.expense.scheduled) {
      alert('You can not delete the parent.');
      return;
    }

    if (!confirm('Are you sure?')) {
      return;
    }

    setLoading(true);

    try {
      const res = await ExpenseClient.delete(token, props.groupId, { id: props.expense.id });
      push(`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.expenses}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnDeleteAll = async () => {
    if (confirm('Are you sure?')) {
      setLoading(true);

      await ExpenseClient.deleteByParent(token, props.groupId, {
        id: props.expense.id,
        parent: { id: props.expense?.parent?.id } as Expense
      });

      setLoading(false);
      push(`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.expenses}`);
    }
  };

  const handleOnEditAll = async () => {
    if (confirm('This will edit all data except dates. Are you sure?')) {
      setLoading(true);

      const expense = {
        id: props.expense.id,
        type: typeRef.current.value,
        name: nameRef.current.value,
        value: value,
        date: dateRef.current.value,
        label: props.labels.find(x => x.id === labelRef.current.value),
        comments: commentsRef.current.value,
        parent: props.expense.parent
      } as Expense;

      await ExpenseClient.editByParent(token, props.groupId, expense);

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
        value: value,
        date: addMonths(new Date(dateRef.current.value), i).toISOString(),
        label: props.labels.find(x => x.id === labelRef.current.value),
        comments: commentsRef.current.value,
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
        const newExpense = await ExpenseClient.add(token, props.groupId, {
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
      {isEditMode() && <h3>Edit expense</h3>}
      {isAddMode() && <h3>Add new expense</h3>}
    </>
  );
  const formFooter: JSX.Element[] = isAddMode()
    ? [
        <B4hButton key="preview" onClick={handleOnPreviewAdd} disabled={loading}>
          add
        </B4hButton>,
        <B4hButton key="action" onClick={handleOnManage} disabled={loading}>
          add and submit
        </B4hButton>
      ]
    : [
        <B4hButton key="action" onClick={handleOnManage} disabled={loading}>
          edit
        </B4hButton>,
        props.expense.scheduled && (
          <B4hButton key="actionAll" onClick={handleOnEditAll} disabled={loading}>
            edit all
          </B4hButton>
        ),
        <B4hButton key="delete" onClick={handleOnDelete} disabled={loading}>
          delete
        </B4hButton>,
        props.expense.scheduled && (
          <B4hButton key="deleteAll" onClick={handleOnDeleteAll} disabled={loading}>
            delete all
          </B4hButton>
        )
      ];

  return (
    <>
      <B4hForm label={formLabel} footer={formFooter}>
        <B4hSelect
          key="type"
          id="type"
          ref={typeRef}
          defaultValue={props.expense?.type ?? ExpenseType.outcoming}
          options={[
            { key: ExpenseType.outcoming, value: ExpenseType.outcoming },
            { key: ExpenseType.incoming, value: ExpenseType.incoming }
          ]}
          label="Type"
        />

        <B4hInput
          key="name"
          id="name"
          ref={nameRef}
          defaultValue={props.expense?.name}
          label="Name"
        />

        {isEditMode() && props.expense?.scheduled && (
          <B4hInput
            disabled
            key="scheduled"
            id="scheduled"
            label="Scheduled"
            defaultValue={props.expense?.scheduled}
          />
        )}

        <B4hInputCurrency label="Value" value={value} setValue={setValue} />

        <B4hInput
          key="date"
          id="date"
          type="datetime-local"
          label="Date"
          ref={dateRef}
          onChange={event => console.log(new Date(event.target.value).toISOString())}
          defaultValue={format(
            props.expense?.date ? new Date(props.expense?.date) : new Date(),
            "yyyy-MM-dd'T'HH:mm"
          )}
        />

        <B4hSelect
          key="label"
          id="label"
          label="Label"
          ref={labelRef}
          defaultValue={props.expense?.label?.id ?? props.labels.at(0)?.id}
          options={props.labels.map(label => {
            return {
              key: label.id,
              value: `${label.icon ?? ''} ${label.name}`
            };
          })}
        />

        <B4hTextarea
          id={'comments'}
          ref={commentsRef}
          defaultValue={props.expense?.comments}
          label={'Comments'}
          sublabel={'(optional)'}
          rows={3}
        />

        {isAddMode() && (
          <B4hSelect
            key="auto"
            id="auto"
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
          label="Preview"
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
