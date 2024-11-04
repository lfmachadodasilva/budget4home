'use client';

import { B4hButton } from '@/components/ui/button/button';
import { B4hForm } from '@/components/ui/form/form';
import { ACTION_SUBMIT } from '@/utils/constants';
import { B4hRoutes } from '@/utils/routes';
import { useB4hAuth } from '@b4h/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginFormSchema, LoginFormType } from './schema';

export const B4hLoginForm = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { login, user } = useB4hAuth();
  const { push } = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema)
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data, event) => {
    event?.preventDefault();
    setIsLoading(ACTION_SUBMIT);
    setError(null);

    try {
      await login(data.email, data.password);
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setIsLoading(null);
    }
  };

  useEffect(() => {
    if (user && !isLoading) {
      push(B4hRoutes.home);
    }
  }, [user, isLoading, push]);

  return (
    <>
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
          <B4hForm.Label htmlFor="password" id="password">
            password
          </B4hForm.Label>
          <B4hForm.Input
            type="password"
            {...register('password')}
            disabled={!!isLoading}
            aria-labelledby="password"
            placeholder="password"
          />
          <B4hForm.LabelError>{errors?.password?.message}</B4hForm.LabelError>
        </B4hForm.Field>

        <B4hForm.Actions>
          <B4hButton type="submit" loading={isLoading === ACTION_SUBMIT} name={ACTION_SUBMIT}>
            login
          </B4hButton>
          <Link href={B4hRoutes.register}>
            <B4hButton buttonType="secondary" widthFit>
              register
            </B4hButton>
          </Link>
          <Link href={B4hRoutes.reset}>
            <B4hButton buttonType="secondary" widthFit>
              reset password
            </B4hButton>
          </Link>
        </B4hForm.Actions>

        {error && <B4hForm.LabelError>{error}</B4hForm.LabelError>}
      </B4hForm.Root>
    </>
  );
};
