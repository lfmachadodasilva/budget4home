import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next/types';
import { useRef } from 'react';
import { B4hRoutes } from '../../../util/routes';
import { B4hHeader } from '../../header';
import { getServerSideProps } from './server';

export function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { push } = useRouter();

  const nameRef = useRef<HTMLInputElement>();

  const handleOnManage = async () => {
    // TODO validate name
    // TODO loading state

    try {
      if (!props.group?.id) {
        await fetch(B4hRoutes.api + B4hRoutes.groups, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: nameRef.current.value })
        });
      } else {
        await fetch(B4hRoutes.api + B4hRoutes.groups, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: props.group.id, name: nameRef.current.value })
        });
      }
      await push(B4hRoutes.groups);
    } catch {
      // TODO show error msg
    }
  };

  const handleOnDelete = async () => {
    await fetch(B4hRoutes.api + B4hRoutes.groups, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: props.group.id })
    });

    await push(B4hRoutes.groups);
  };

  return (
    <>
      <h5>Group</h5>
      <B4hHeader />

      <br></br>
      <br></br>

      <>
        {props.group?.id && (
          <>
            <label>Id</label>
            <p>{props.group.id}</p>
          </>
        )}
        <>
          <label>Name</label>
          <input ref={nameRef} defaultValue={props.group?.name} />
        </>
      </>

      <br></br>
      <br></br>

      <button onClick={handleOnManage}>{props.group?.id ? 'Update' : 'Add'}</button>
      {props.group?.id && <button onClick={handleOnDelete}>Delete</button>}
    </>
  );
}
