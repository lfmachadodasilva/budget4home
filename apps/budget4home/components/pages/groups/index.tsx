import Link from 'next/link';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next/types';
import { B4hRoutes } from '../../../util/routes';
import { B4hHeader } from '../../header';
import { getServerSideProps } from './server';

export function Groups(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { push } = useRouter();

  const handleOnAdd = async () => {
    await push(B4hRoutes.groupAdd);
  };

  return (
    <>
      <h5>Groups</h5>
      <B4hHeader />
      <br></br>
      <br></br>
      <button onClick={handleOnAdd}>Add</button>

      <ul>
        {props.groups.map(group => {
          return (
            <li key={group.id}>
              <label>{group.name}</label>
              {' - '}
              <Link href={`${B4hRoutes.groups}/${group.id}`}>edit</Link>
              {' - '}
              <Link href={`${B4hRoutes.groups}/${group.id}${B4hRoutes.labels}`}>labels</Link>
              {' - '}
              <Link href={`${B4hRoutes.groups}/${group.id}${B4hRoutes.expenses}`}>expenses</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
