'use client';

import { B4hButton } from '@/components/ui/button/button';
import { B4hForm } from '@/components/ui/form/form';
import { ACTION_SUBMIT } from '@/utils/constants';
import { B4hRoutes } from '@/utils/routes';
import { useB4hAuth } from '@b4h/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerFormSchema, RegisterFormType } from './schema';

export default function B4hRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema)
  });
  const { register: registerAuth } = useB4hAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { push } = useRouter();

  const onSubmit: SubmitHandler<RegisterFormType> = async (data, event) => {
    event?.preventDefault();

    setIsLoading(ACTION_SUBMIT);
    setError(null);

    try {
      await registerAuth(data.email, data.password1);
      push(B4hRoutes.home);
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <>
      <h1>register</h1>
      <B4hForm.Root onSubmit={handleSubmit(onSubmit)}>
        <B4hForm.Field>
          <B4hForm.Label htmlFor="email" id="email">
            email
          </B4hForm.Label>
          <B4hForm.Input
            {...register('email')}
            disabled={!!isLoading}
            aria-labelledby="email"
            placeholder="email"
          />
          <B4hForm.LabelError>{errors?.email?.message}</B4hForm.LabelError>
        </B4hForm.Field>
        <B4hForm.Field>
          <B4hForm.Label htmlFor="password1" id="password1">
            password
          </B4hForm.Label>
          <B4hForm.Input
            type="password"
            {...register('password1')}
            disabled={!!isLoading}
            aria-labelledby="password1"
            placeholder="password"
          />
          <B4hForm.LabelError>{errors?.password1?.message}</B4hForm.LabelError>
        </B4hForm.Field>
        <B4hForm.Field>
          <B4hForm.Label htmlFor="password2" id="password2">
            password
          </B4hForm.Label>
          <B4hForm.Input
            type="password"
            {...register('password2')}
            disabled={!!isLoading}
            aria-labelledby="password2"
            placeholder="password"
          />
          <B4hForm.LabelError>{errors?.password2?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Actions>
          <B4hButton type="submit" loading={isLoading === ACTION_SUBMIT} name={ACTION_SUBMIT}>
            register
          </B4hButton>
          <Link href={B4hRoutes.login}>
            <B4hButton buttonType="secondary" widthFit>
              login
            </B4hButton>
          </Link>
        </B4hForm.Actions>

        <B4hForm.LabelError>{error}</B4hForm.LabelError>
      </B4hForm.Root>
    </>
  );
}
