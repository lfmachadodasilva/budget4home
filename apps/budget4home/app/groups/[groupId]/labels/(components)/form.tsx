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

  const handleOnManage = async () => {
    // TODO validate name
    // TODO loading state

    setLoading(true);
    try {
      if (!props.label?.id) {
        await LabelClient.add(token, {
          name: nameRef.current.value,
          groupId: props.groupId
        });
      } else {
        await LabelClient.edit(token, {
          id: props.label.id,
          name: nameRef.current.value,
          groupId: props.groupId
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

      await LabelClient.delete(token, {
        id: props.label.id,
        groupId: props.groupId
      });

      push(`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.labels}`);
      setLoading(false);
    }
  };

  const formLabel = (
    <>
      {props.label?.id && (
        <>
          <h3>Label: {props.label.id}</h3>
        </>
      )}
      {!props.label?.id && (
        <>
          <h3>Add new label</h3>
        </>
      )}
    </>
  );
  const formFooter = [
    <>
      <B4hButton onClick={handleOnManage} disabled={loading}>
        {props.label?.id ? 'Update' : 'Add'}
      </B4hButton>
      {props.label?.id && <B4hButton onClick={handleOnDelete}>Delete</B4hButton>}
    </>
  ];

  return (
    <B4hForm label={formLabel} footer={formFooter}>
      <B4hInput id={'name'} ref={nameRef} defaultValue={props.label?.name} label={'Name'} />
    </B4hForm>
  );
}
