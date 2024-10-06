'use client';

import { B4hButton } from '../../components/ui/button/button';
import { B4hForm } from '../../components/ui/form/form';
import Link from 'next/link';
import { B4hRoutes } from '../../utils/routes';
import { SubmitHandler, useForm } from 'react-hook-form';

type RegisterForm = {
  email: string;
  password1: string;
  password2: string;
};

export default function RegisterClient() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>();

  const onSubmit: SubmitHandler<RegisterForm> = (data, event) => {
    event?.preventDefault();

    console.log(data);
  };

  return (
    <>
      <h1>register</h1>
      <B4hForm.Root onSubmit={handleSubmit(onSubmit)}>
        <B4hForm.Label htmlFor="login">email</B4hForm.Label>
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
        <B4hForm.Label htmlFor="password1">password</B4hForm.Label>
        <B4hForm.Input
          type="password"
          {...register('password1', {
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
        {errors.password2 && <B4hForm.LabelError>{errors.password2.message}</B4hForm.LabelError>}
        <B4hForm.Label htmlFor="password2">confirm password</B4hForm.Label>
        <B4hForm.Input
          type="password"
          {...register('password2', {
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
        {errors.password2 && <B4hForm.LabelError>{errors.password2.message}</B4hForm.LabelError>}
        <B4hForm.Actions>
          <B4hButton type="submit">register</B4hButton>
          <Link href={B4hRoutes.login}>
            <B4hButton buttonType="secondary" widthFit>
              login
            </B4hButton>
          </Link>
        </B4hForm.Actions>
      </B4hForm.Root>
    </>
  );
}
