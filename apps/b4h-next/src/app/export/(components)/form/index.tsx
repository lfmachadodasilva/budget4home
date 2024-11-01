'use client';

import { B4hLoading } from '@/components/loading';
import { B4hButton } from '@/components/ui/button/button';
import { B4hForm } from '@/components/ui/form/form';
import { ACTION_DONE, ACTION_SUBMIT } from '@/utils/constants';
import { defaultFormState } from '@/utils/formState';
import { GroupModel } from '@b4h/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { CopyIcon, DownloadIcon } from '@radix-ui/react-icons';
import { startTransition, useActionState, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { onSubmitAction } from './actions/submit';
import { exportFormSchema, ExportFormType } from './schema';

interface B4hExportFormProps {
  groups: GroupModel[] | null;
  userId: string;
  groupId: string;
}

export const B4hExportForm = (props: B4hExportFormProps) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [state, formAction] = useActionState(onSubmitAction, defaultFormState);

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<ExportFormType>({
    resolver: zodResolver(exportFormSchema),
    defaultValues: {
      group: props.groupId
    }
  });

  const onSubmit: SubmitHandler<ExportFormType> = async (data, event) => {
    event?.preventDefault();

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

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(state.data, null, 2));
  }, [state.data]);

  const handleDownload = useCallback(() => {
    const dataStr = JSON.stringify(state.data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [state.data]);

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

        <B4hForm.Actions>
          <B4hButton type="submit" loading={isLoading === ACTION_SUBMIT} name={ACTION_SUBMIT}>
            export
          </B4hButton>
        </B4hForm.Actions>
      </B4hForm.Root>

      {isLoading === ACTION_SUBMIT && <B4hLoading />}
      {!isLoading && state.data && (
        <>
          <B4hForm.TextArea rows={10} value={JSON.stringify(state.data, null, 2)} disabled />
          <B4hButton loading={isLoading === ACTION_SUBMIT} onClick={handleCopy}>
            <CopyIcon />
            copy
          </B4hButton>
          <B4hButton loading={isLoading === ACTION_SUBMIT} onClick={handleDownload}>
            <DownloadIcon />
            download
          </B4hButton>
        </>
      )}
    </>
  );
};
