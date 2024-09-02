import { B4hRoutes } from '@/shared/routes';
import { addExpense, updateExpense } from '@b4h/firestore';
import { ExpenseModel, ExpenseType, LabelModel } from '@b4h/models';
import { B4hButton, B4hForm, B4hInput, B4hSelect } from '@b4h/web-components';
import { format } from 'date-fns';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const ExpenseForm = async ({
  userId,
  groupId,
  labels,
  expense
}: {
  userId: string;
  groupId: string;
  labels: LabelModel[];
  expense?: ExpenseModel | null;
}) => {
  const handleOnSubmit = async (formData: FormData) => {
    'use server';

    const newExpense = {
      ...expense,
      type: formData.get('type') as string,
      name: formData.get('name') as string,
      value: (formData.get('value') ?? 0) as number,
      label: formData.get('label') as string,
      date: new Date(formData.get('date') as string)
    } as ExpenseModel;

    try {
      expense
        ? await updateExpense(userId, groupId, newExpense)
        : await addExpense(userId, groupId, newExpense);
      redirect(B4hRoutes.expenses);
    } catch (err) {
      console.error('ExpenseForm', err);
    }
  };

  return (
    <>
      <B4hForm action={handleOnSubmit}>
        <label htmlFor="name">type</label>
        <B4hSelect id="type" name="type" defaultValue={expense?.type ?? ExpenseType.outcoming}>
          <option value={ExpenseType.outcoming}>outcoming</option>
          <option value={ExpenseType.incoming}>incoming</option>
        </B4hSelect>
        <label htmlFor="name">name</label>
        <B4hInput type="text" id="name" name="name" defaultValue={expense?.name} />
        <label htmlFor="name">value</label>
        <B4hInput type="number" id="value" name="value" defaultValue={expense?.value} />
        <label htmlFor="date">value</label>
        <B4hInput
          type="datetime-local"
          id="date"
          name="date"
          defaultValue={format(
            expense?.date ? new Date(expense?.date) : new Date(),
            "yyyy-MM-dd'T'HH:mm"
          )}
        />
        <label htmlFor="label">label</label>
        <B4hSelect
          id="label"
          name="label"
          defaultValue={(expense?.label as string) ?? labels[0].id}
        >
          {labels.map(label => (
            <option key={label.id} value={label.id}>
              {label.icon} {label.name}
            </option>
          ))}
        </B4hSelect>

        <B4hButton type="submit">{expense ? 'update' : 'add'}</B4hButton>
        <Link href={B4hRoutes.expenses}>
          <B4hButton buttonType="secondary" widthFit>
            cancel
          </B4hButton>
        </Link>
      </B4hForm>
    </>
  );
};
