import Link from 'next/link';
import { B4hButton } from '../../components/button/button';
import { B4hForm } from '../../components/form/form';
import { B4hRoutes } from '../../utils/routes';

export default function Login() {
  return (
    <>
      <h1>login</h1>
      <B4hForm.Root>
        <B4hForm.Label htmlFor="login">email</B4hForm.Label>
        <B4hForm.Input name="login" type="text" />
        <B4hForm.Label htmlFor="password">password</B4hForm.Label>
        <B4hForm.Input name="password" type="password" />
        <B4hForm.Actions>
          <B4hButton type="submit">login</B4hButton>
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
