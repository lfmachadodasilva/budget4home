import { B4hRoutes } from '@/shared/routes';
import { addLabel, updateLabel } from '@b4h/firestore';
import { LabelModel } from '@b4h/models';
import { B4hButton, B4hForm, B4hInput } from '@b4h/web-components';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const LabelForm = async ({
  userId,
  groupId,
  label
}: {
  userId: string;
  groupId: string;
  label?: LabelModel | null;
}) => {
  const handleOnSubmit = async (formData: FormData) => {
    'use server';

    const newLabel = {
      ...label,
      name: formData.get('name') as string,
      icon: formData.get('icon') as string
    } as LabelModel;

    try {
      label
        ? await updateLabel(userId, groupId, newLabel)
        : await addLabel(userId, groupId, newLabel);
      redirect(B4hRoutes.groups);
    } catch (err) {
      console.error('LabelForm', err);
    }
  };

  return (
    <>
      <B4hForm action={handleOnSubmit}>
        <label htmlFor="name">name</label>
        <B4hInput type="text" id="name" name="name" defaultValue={label?.name} />
        <label htmlFor="name">icon</label>
        <B4hInput type="text" id="icon" name="icon" defaultValue={label?.icon} />
        <B4hButton type="submit">{label ? 'update' : 'add'}</B4hButton>
        <Link href={B4hRoutes.labels}>
          <B4hButton buttonType="secondary" widthFit>
            cancel
          </B4hButton>
        </Link>
      </B4hForm>
    </>
  );
};
