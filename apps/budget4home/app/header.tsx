"use client";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { useAuth } from "../contexts/auth";
import { firebaseAuth } from "../util/firebase";

import { B4hRoutes } from "../util/routes";

export const Header = () => {
  const { user } = useAuth();

  const handleOnLogout = async () => {
    await signOut(firebaseAuth);
  };

  return (
    <>
      <Link href={B4hRoutes.home}>home</Link>
      <br></br>
      <Link href={B4hRoutes.groups}>groups</Link>
      <br></br>
      <Link href={B4hRoutes.labels}>labels</Link>
      <br></br>
      <Link href={B4hRoutes.expenses}>expenses</Link>
      <br></br>
      {user && <button onClick={handleOnLogout}>Logout</button>}
    </>
  );
};
