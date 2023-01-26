'use client';

import { Label } from '@budget4home/base';
import { B4hButton, B4hForm, B4hInput } from '@budget4home/ui-components';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { LabelClient } from '../../../../../clients';
import { useAuth } from '../../../../../contexts/auth';
import { B4hRoutes } from '../../../../../util/routes';

interface LabelFormProps {
  label?: Label;
  groupId: string;
}

export function LabelForm(props: LabelFormProps) {
  const { token } = useAuth();
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>();
  const iconRef = useRef<HTMLInputElement>();

  const handleOnManage = async () => {
    // TODO validate name
    // TODO loading state

    setLoading(true);

    const label = {
      name: nameRef.current.value,
      icon: iconRef.current.value
    } as Label;

    try {
      if (!props.label?.id) {
        await LabelClient.add(token, props.groupId, label);
      } else {
        await LabelClient.edit(token, props.groupId, {
          ...label,
          id: props.label.id
        });
      }

      push(`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.labels}`);
    } catch {
      // TODO show error msg
    }
    setLoading(false);
  };

  const handleOnDelete = async () => {
    if (confirm('Are you sure?')) {
      setLoading(true);

      await LabelClient.delete(token, props.groupId, { id: props.label.id });

      push(`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.labels}`);
      setLoading(false);
    }
  };

  const formLabel = (
    <>
      {props.label?.id && <h3>Edit label</h3>}
      {!props.label?.id && <h3>Add new label</h3>}
    </>
  );
  const formFooter = [
    <>
      <B4hButton key="action" onClick={handleOnManage} disabled={loading}>
        {props.label?.id ? 'Edit' : 'Add'}
      </B4hButton>
      {props.label?.id && (
        <B4hButton key="delete" onClick={handleOnDelete}>
          Delete
        </B4hButton>
      )}
    </>
  ];

  return (
    <B4hForm key="manage" label={formLabel} footer={formFooter}>
      <B4hInput id={'name'} ref={nameRef} defaultValue={props.label?.name} label={'Name'} />
      <B4hInput
        id={'icon'}
        ref={iconRef}
        defaultValue={props.label?.icon}
        label={'Icon'}
        sublabel="(optional)"
      />
    </B4hForm>
  );
}
