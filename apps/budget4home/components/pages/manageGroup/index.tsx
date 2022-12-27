import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next/types';
import { ChangeEvent, useRef } from 'react';
import { useAuth } from '../../../contexts/auth';
import { B4hRoutes } from '../../../util/routes';
import { B4hHeader } from '../../header';
import { getServerSideProps } from './server';

export function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { push } = useRouter();
  const { token } = useAuth();

  const nameRef = useRef<HTMLInputElement>();
  const userIdsRef = useRef<string[]>(props.group?.userIds ?? []);

  const handleOnManage = async () => {
    // TODO validate name
    // TODO loading state

    try {
      if (!props.group?.id) {
        await fetch(B4hRoutes.api + B4hRoutes.groups, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: token
          },
          body: JSON.stringify({ name: nameRef.current.value, userIds: userIdsRef.current })
        });
      } else {
        await fetch(B4hRoutes.api + B4hRoutes.groups, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: token
          },
          body: JSON.stringify({ id: props.group.id, name: nameRef.current.value, userIds: userIdsRef.current })
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
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ id: props.group.id })
    });

    await push(B4hRoutes.groups);
  };

  const handleOnChangeUser = async (event: ChangeEvent<{ checked: boolean }>, id: string) => {
    if (event.target.checked) {
      userIdsRef.current.push(id);
    } else {
      userIdsRef.current = userIdsRef.current.filter(x => x !== id);
    }
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
        <>
          {props.users?.map(x => {
            return (
              <p key={x.id}>
                {x.id} - {x.email}
                <input
                  type={'checkbox'}
                  defaultChecked={props.group?.userIds?.includes(x.id) ?? false}
                  onChange={event => handleOnChangeUser(event, x.id)}
                />
              </p>
            );
          })}
        </>
      </>

      <br></br>
      <br></br>

      <button onClick={handleOnManage}>{props.group?.id ? 'Update' : 'Add'}</button>
      {props.group?.id && <button onClick={handleOnDelete}>Delete</button>}
    </>
  );
}
