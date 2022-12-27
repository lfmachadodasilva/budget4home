import Link from 'next/link';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next/types';
import { B4hRoutes } from '../../../util/routes';
import { B4hHeader } from '../../header';
import { getServerSideProps } from './server';

export function Labels(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { push, query } = useRouter();

  const handleOnAdd = async () => {
    await push(`${B4hRoutes.groups}/${query.groupId}${B4hRoutes.labelAdd}`);
  };

  return (
    <>
      <h5>Labels</h5>
      <B4hHeader />
      <br></br>
      <br></br>
      <button onClick={handleOnAdd}>Add</button>

      <ul>
        {props.labels.map(label => {
          return (
            <li key={label.id}>
              <label>{label.name}</label>
              {' - '}
              <Link href={`${B4hRoutes.groups}/${query.groupId}${B4hRoutes.labels}/${label.id}`}>
                edit
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
