'use client';

import { B4hApiRoutes, B4hRoutes } from '@/utils/routes';
import { useB4hAuth } from '@b4h/firebase';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@b4h/shadcn';
import { PersonIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

const baseUrl = (process.env['NEXT_PUBLIC_API_URL'] as string) ?? 'http://localhost:3000';
export const logoutFetch = async () =>
  fetch(new URL(B4hApiRoutes.login, baseUrl), {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    cache: 'no-cache'
  });

export const B4hMenuUser = () => {
  const { push, refresh } = useRouter();
  const { user, logout } = useB4hAuth();

  const handleLogout = async () => {
    await logout()
      .then(async () => {
        await logoutFetch();
      })
      .finally(() => {
        push(B4hRoutes.login);
        refresh();
      });
  };
  const handleLogin = () => {
    push(B4hRoutes.login);
  };

  if (!user) {
    return <PersonIcon className="w-5 h-5" onClick={handleLogin} />;
  }

  const avatar = user?.photoURL ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="avatar"
      className="w-6 h-6 object-cover align-middle rounded-full"
      src={user?.photoURL}
    />
  ) : (
    <PersonIcon className="w-5 h-5" />
  );

  return (
    <Drawer>
      <DrawerTrigger>{avatar}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>hi {user.displayName ?? user.email?.split('@')[0]}</DrawerTitle>
          <DrawerDescription>here your options</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">settings</Button>
          </DrawerClose>
          <div className="flex justify-center gap-2">
            <DrawerClose asChild>
              <Button variant="ghost">import</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="ghost">export</Button>
            </DrawerClose>
          </div>
          <DrawerClose asChild>
            <Button variant="outline" onClick={handleLogout}>
              logout
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
