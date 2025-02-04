'use client';

import { B4hButton } from '@/components/ui/button/button';
import { B4hFade } from '@/components/ui/fade';
import { B4hForm } from '@/components/ui/form/form';
import { ACTION_SUBMIT } from '@/utils/constants';
import { updateProfile, useB4hAuth } from '@b4h/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { labelFormSchema, LabelFormType } from './schema';

import styles from '@/components/header/header.module.scss';
import { B4hRoutes } from '@/utils/routes';
import Link from 'next/link';

export const B4hSettingsForm = () => {
  const { user } = useB4hAuth();
  const { refresh } = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(user?.photoURL);

  console.log('user', user);

  const {
    register,
    handleSubmit,
    formState: { errors },

    watch
  } = useForm<LabelFormType>({
    resolver: zodResolver(labelFormSchema),
    defaultValues: {
      id: user?.uid,
      name: user?.displayName,
      email: user?.email,
      photoUrl: user?.photoURL
    }
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'photoUrl' && value.photoUrl && value.photoUrl.length > 10) {
        setPreviewUrl(value.photoUrl);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<LabelFormType> = async (data, event) => {
    const submitter = (event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement;

    event?.preventDefault();
    setIsLoading(submitter.name);

    try {
      user &&
        (await updateProfile(user, {
          displayName: data.name,
          photoURL: data.photoUrl
        }));
      refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <>
      <B4hForm.Root onSubmit={handleSubmit(onSubmit)}>
        <B4hForm.Title>user settings</B4hForm.Title>
        <B4hForm.Field>
          <B4hForm.Label htmlFor="id">id</B4hForm.Label>
          <B4hForm.Input type="text" {...register('id')} disabled={true} />
          <B4hForm.LabelError>{errors?.id?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="email">email</B4hForm.Label>
          <B4hForm.Input type="text" {...register('email')} disabled={true} />
          <B4hForm.LabelError>{errors?.email?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="name">display name</B4hForm.Label>
          <B4hForm.Input
            type="text"
            {...register('name')}
            disabled={!!isLoading}
            placeholder="display name"
          />
          <B4hForm.LabelError>{errors?.name?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label htmlFor="photoUrl">photo url</B4hForm.Label>
          <B4hForm.Input
            type="text"
            {...register('photoUrl')}
            disabled={!!isLoading}
            placeholder="photo url"
          />
          <B4hForm.LabelError>{errors?.photoUrl?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <AnimatePresence>
          {previewUrl && previewUrl.length > 10 && (
            <B4hFade>
              <B4hForm.Field>
                <B4hForm.Label>preview</B4hForm.Label>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.avatar} src={previewUrl} alt="avatar" />
              </B4hForm.Field>
            </B4hFade>
          )}
        </AnimatePresence>

        <B4hForm.Actions>
          <B4hButton type="submit" loading={isLoading === ACTION_SUBMIT} name={ACTION_SUBMIT}>
            update
          </B4hButton>
          <Link href={B4hRoutes.reset}>
            <B4hButton loading={isLoading === ACTION_SUBMIT} name={ACTION_SUBMIT} widthFit>
              reset password
            </B4hButton>
          </Link>
        </B4hForm.Actions>
      </B4hForm.Root>
    </>
  );
};
