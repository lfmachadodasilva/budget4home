'use client';

import { B4hButton, B4hForm, B4hInput } from '@budget4home/ui-components';
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef } from 'react';
import { useAuth } from '../../contexts/auth';
import { getLocale } from '../../locales';
import { firebaseStorage } from '../../util/firebase';

export default function () {
  const { user } = useAuth();
  const { refresh } = useRouter();
  const locale = getLocale();

  const displayNameRef = useRef<HTMLInputElement>();
  const avatarRef = useRef<HTMLInputElement>();

  const handleOnUpdate = async () => {
    try {
      await updateProfile(user, {
        displayName: displayNameRef.current.value
      });
      alert(locale.settings.successEditSettings);
    } catch (err) {
      console.error(err);
      alert(locale.settings.failEditSettings);
    }
    refresh();
  };

  const handleOnAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileName = `budget4home/avatar/${user.uid}`;
    const storageRef = ref(firebaseStorage, fileName);

    try {
      const snapshot = await uploadBytes(storageRef, event.target.files[0]);
      const url = await getDownloadURL(snapshot.ref);
      await updateProfile(user, {
        displayName: user.displayName,
        photoURL: url
      });
      refresh();
    } catch (err) {
      console.error(err);
      alert(locale.settings.failUploadAvatar);
    }
  };

  return (
    <B4hForm
      label={locale.settings.title}
      footer={<B4hButton onClick={handleOnUpdate}>{locale.settings.action}</B4hButton>}
    >
      <B4hInput defaultValue={user?.email} label="email" disabled />
      <B4hInput
        ref={displayNameRef}
        defaultValue={user?.displayName}
        label={locale.settings.displayName}
        sublabel={locale.common.optional}
      />
      <B4hInput
        onChange={handleOnAvatar}
        ref={avatarRef}
        type="file"
        label={locale.settings.avatar}
        sublabel={locale.common.optional}
      />
    </B4hForm>
  );
}
