'use client';

import { B4hButton } from '@/components/ui/button/button';
import { B4hForm } from '@/components/ui/form/form';
import { B4hRoutes } from '@/utils/routes';
import { useB4hAuth } from '@b4h/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginClient() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>();
  const { login } = useB4hAuth();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<LoginForm> = async (data, event) => {
    event?.preventDefault();

    try {
      await login(data.email, data.password);
      push(B4hRoutes.home);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>login</h1>
      <B4hForm.Root onSubmit={handleSubmit(onSubmit)}>
        <B4hForm.Label htmlFor="email">email</B4hForm.Label>
        <B4hForm.Input
          type="text"
          {...register('email', {
            required: 'email is required',
            maxLength: {
              value: 256,
              message: 'email is too long. max 256 characters'
            },
            minLength: {
              value: 4,
              message: 'email is too short. min 4 characters'
            }
          })}
        />
        {errors.email && <B4hForm.LabelError>{errors.email.message}</B4hForm.LabelError>}
        <B4hForm.Label htmlFor="password">password</B4hForm.Label>
        <B4hForm.Input
          type="password"
          {...register('password', {
            required: 'password is required',
            maxLength: {
              value: 20,
              message: 'password is too long. max 20 characters'
            },
            minLength: {
              value: 4,
              message: 'password is too short. min 4 characters'
            }
          })}
        />
        {errors.password && <B4hForm.LabelError>{errors.password.message}</B4hForm.LabelError>}
        <B4hForm.Actions>
          <B4hButton type="submit" loading={isSubmitting}>
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
      </B4hForm.Root>
    </>
  );
}
