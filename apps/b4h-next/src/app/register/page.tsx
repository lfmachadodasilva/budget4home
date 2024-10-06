import { B4hButton } from '../../components/button/button';
import { B4hForm } from '../../components/form/form';
import Link from 'next/link';
import { B4hRoutes } from '../../utils/routes';

export default function Register() {
  return (
    <>
      <h1>register</h1>
      <B4hForm.Root>
        <B4hForm.Label htmlFor="login">email</B4hForm.Label>
        <B4hForm.Input name="login" type="text" />
        <B4hForm.Label htmlFor="password">password</B4hForm.Label>
        <B4hForm.Input name="password" type="password" />
        <B4hForm.Label htmlFor="password2">confirm password</B4hForm.Label>
        <B4hForm.Input name="password2" type="password" />
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
