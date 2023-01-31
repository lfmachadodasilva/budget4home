'use client';

import { B4hButton, B4hForm, B4hInput } from '@budget4home/ui-components';
import { updateProfile } from 'firebase/auth';
import { ChangeEvent, useRef, useState } from 'react';
import { useAuth } from '../../contexts/auth';

import styles from './index.module.scss';

export default function () {
  const { user } = useAuth();

  const [photoUrl, setPhotoUrl] = useState<string>();

  const displayNameRef = useRef<HTMLInputElement>();
  const photoUrlRef = useRef<HTMLInputElement>();

  const handleOnUpdate = async () => {
    await updateProfile(user, {
      displayName: displayNameRef.current.value,
      photoURL: photoUrlRef.current.value
    });
  };
  const handleOnPhotoUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setPhotoUrl(event.target.value);
  };

  return (
    <B4hForm label={'settings'} footer={<B4hButton onClick={handleOnUpdate}>update</B4hButton>}>
      <B4hInput defaultValue={user?.email} label="email" disabled />
      <B4hInput
        ref={displayNameRef}
        defaultValue={user?.displayName}
        label="display name"
        sublabel="(optional)"
      />
      {photoUrlRef?.current?.value && (
        <img alt="avatar" className={styles.avatar} src={photoUrlRef.current.value} />
      )}
      <B4hInput
        onChange={handleOnPhotoUrl}
        ref={photoUrlRef}
        defaultValue={user?.photoURL}
        value={photoUrl}
        label="photo url"
        sublabel="(optional)"
      />
    </B4hForm>
  );
}
