'use client';

import Link from 'next/link';
import { B4hButton } from '../../components/ui/button/button';
import { B4hForm } from '../../components/ui/form/form';
import { B4hRoutes } from '../../utils/routes';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginClient() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = (data, event) => {
    event?.preventDefault();

    console.log(data);
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
          <B4hButton>login</B4hButton>
          <Link href={B4hRoutes.register}>
            <B4hButton buttonType="secondary" widthFit>
              register
            </B4hButton>
          </Link>
        </B4hForm.Actions>
      </B4hForm.Root>
    </>
  );
}
