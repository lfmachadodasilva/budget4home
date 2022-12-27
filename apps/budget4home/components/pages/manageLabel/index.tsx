import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next/types';
import { useRef } from 'react';
import { useAuth } from '../../../contexts/auth';
import { B4hRoutes } from '../../../util/routes';
import { B4hHeader } from '../../header';
import { getServerSideProps } from './server';

export function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { token } = useAuth();
  const { push, query } = useRouter();

  const nameRef = useRef<HTMLInputElement>();

  const handleOnManage = async () => {
    // TODO validate name
    // TODO loading state

    try {
      if (!props.label?.id) {
        await fetch(B4hRoutes.api + B4hRoutes.labels, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: token
          },
          body: JSON.stringify({ name: nameRef.current.value, groupId: query.groupId })
        });
      } else {
        await fetch(B4hRoutes.api + B4hRoutes.labels, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: token
          },
          body: JSON.stringify({ id: props.label.id, name: nameRef.current.value, groupId: query.groupId })
        });
      }
      await push(`${B4hRoutes.groups}/${query.groupId}${B4hRoutes.labels}`);
    } catch {
      // TODO show error msg
    }
  };

  const handleOnDelete = async () => {
    await fetch(B4hRoutes.api + B4hRoutes.labels, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ id: props.label.id, groupId: query.groupId })
    });

    await push(`${B4hRoutes.groups}/${query.groupId}${B4hRoutes.labels}`);
  };

  return (
    <>
      <h5>Label</h5>
      <B4hHeader />

      <br></br>
      <br></br>

      <>
        {props.label?.id && (
          <>
            <label>Id</label>
            <p>{props.label.id}</p>
          </>
        )}
        <>
          <label>Name</label>
          <input ref={nameRef} defaultValue={props.label?.name} />
        </>
      </>

      <br></br>
      <br></br>

      <button onClick={handleOnManage}>{props.label?.id ? 'Update' : 'Add'}</button>
      {props.label?.id && <button onClick={handleOnDelete}>Delete</button>}
    </>
  );
}
