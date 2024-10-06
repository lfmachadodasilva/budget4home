'use client';

import { B4hButton } from '../../components/ui/button/button';
import { B4hForm } from '../../components/ui/form/form';
import Link from 'next/link';
import { B4hRoutes } from '../../utils/routes';
import { SubmitHandler, useForm } from 'react-hook-form';

type ResetForm = {
  email: string;
};

export default function ResetClient() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetForm>();

  const onSubmit: SubmitHandler<ResetForm> = (data, event) => {
    event?.preventDefault();

    console.log(data);
  };

  return (
    <>
      <h1>reset password</h1>
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
        <B4hForm.Actions>
          <B4hButton type="submit">reset</B4hButton>
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
