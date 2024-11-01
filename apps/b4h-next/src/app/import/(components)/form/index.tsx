'use client';

import { B4hButton } from '@/components/ui/button/button';
import { B4hForm } from '@/components/ui/form/form';
import { ACTION_DONE, ACTION_SUBMIT } from '@/utils/constants';
import { defaultFormState } from '@/utils/formState';
import { GroupModel } from '@b4h/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { onSubmitAction } from './actions/submit';
import { importFormSchema, ImportFormType } from './schema';

interface B4hImportFormProps {
  groups: GroupModel[] | null;
  userId: string;
  groupId: string;
}

export const B4hImportForm = (props: B4hImportFormProps) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [state, formAction] = useActionState(onSubmitAction, defaultFormState);

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<ImportFormType>({
    resolver: zodResolver(importFormSchema),
    defaultValues: {
      group: props.groupId
    }
  });

  const onSubmit: SubmitHandler<ImportFormType> = async (data, event) => {
    event?.preventDefault();

    const readFileAsString = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsText(file);
      });
    };
    data.fileData = await readFileAsString(data.file[0] as File);

    setIsLoading(ACTION_SUBMIT);
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if ([state.message].includes(ACTION_DONE)) {
      setIsLoading(null);
    }
  }, [state]);

  return (
    <>
      <B4hForm.Root onSubmit={handleSubmit(onSubmit)}>
        {(props.groups?.length ?? 0) > 0 && (
          <B4hForm.Field>
            <B4hForm.Label htmlFor="group">group</B4hForm.Label>
            <B4hForm.Select {...register('group')} disabled={!!isLoading}>
              {props.groups?.map(group => (
                <B4hForm.Option key={group.id} value={group.id}>
                  {group.name}
                </B4hForm.Option>
              ))}
            </B4hForm.Select>
            <B4hForm.LabelError>{errors?.group?.message}</B4hForm.LabelError>
          </B4hForm.Field>
        )}

        <B4hForm.Field>
          <B4hForm.Label htmlFor="file">file</B4hForm.Label>
          <B4hForm.Input type="file" id="file" {...register('file')} />
          <B4hForm.LabelError>{errors?.file?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="format">format</B4hForm.Label>
          <B4hForm.Select {...register('format')} disabled={!!isLoading}>
            <B4hForm.Option key="budget4home" value="budget4home">
              budget4home
            </B4hForm.Option>
            <B4hForm.Option key="monzo" value="monzo" disabled>
              monzo 🚧
            </B4hForm.Option>
            <B4hForm.Option key="revolut" value="revolut" disabled>
              revolut 🚧
            </B4hForm.Option>
          </B4hForm.Select>
          <B4hForm.LabelError>{errors?.group?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Actions>
          <B4hButton type="submit" loading={isLoading === ACTION_SUBMIT} name={ACTION_SUBMIT}>
            import
          </B4hButton>
        </B4hForm.Actions>
      </B4hForm.Root>
    </>
  );
};
