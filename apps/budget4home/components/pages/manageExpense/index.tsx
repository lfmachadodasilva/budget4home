import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next/types';
import { useRef } from 'react';
import { useAuth } from '../../../contexts/auth';
import { ExpenseType } from '../../../models/expense';
import { B4hRoutes } from '../../../util/routes';
import { B4hHeader } from '../../header';
import { getServerSideProps } from './server';

export function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { push, query } = useRouter();
  const { token } = useAuth();

  const typeRef = useRef<HTMLSelectElement>();
  const nameRef = useRef<HTMLInputElement>();
  const valueRef = useRef<HTMLInputElement>();
  const dateRef = useRef<HTMLInputElement>();
  const labelRef = useRef<HTMLSelectElement>();

  const handleOnManage = async () => {
    // TODO validate name
    // TODO loading state

    try {
      if (!props.expense?.id) {
        await fetch(B4hRoutes.api + B4hRoutes.expenses, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: token
          },
          body: JSON.stringify({
            type: typeRef.current.value,
            name: nameRef.current.value,
            value: valueRef.current.value,
            date: dateRef.current.value,
            label: { id: labelRef.current.value },

            groupId: query.groupId
          })
        });
      } else {
        await fetch(B4hRoutes.api + B4hRoutes.expenses, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: token
          },
          body: JSON.stringify({
            id: props.expense.id,
            type: typeRef.current.value,
            name: nameRef.current.value,
            value: valueRef.current.value,
            date: dateRef.current.value,
            label: { id: labelRef.current.value },

            groupId: query.groupId
          })
        });
      }
      await push(`${B4hRoutes.groups}/${query.groupId}${B4hRoutes.expenses}`);
    } catch {
      // TODO show error msg
    }
  };

  const handleOnDelete = async () => {
    if (confirm('Are you sure?')) {
      await fetch(B4hRoutes.api + B4hRoutes.expenses, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        },
        body: JSON.stringify({ id: props.expense.id, groupId: query.groupId })
      });
      await push(`${B4hRoutes.groups}/${query.groupId}${B4hRoutes.expenses}`);
    }
  };

  return (
    <>
      <h5>Expense</h5>
      <B4hHeader />

      <br></br>
      <br></br>

      <>
        {props.expense?.id && (
          <>
            <label>Id</label>
            <p>{props.expense.id}</p>
          </>
        )}
        <>
          <label>Type</label>
          <select ref={typeRef} defaultValue={props.expense?.type ?? ExpenseType.outcoming}>
            <option value={ExpenseType.outcoming}>{ExpenseType.outcoming}</option>
            <option value={ExpenseType.incoming}>{ExpenseType.incoming}</option>
          </select>
        </>
        <br></br>
        <>
          <label>Name</label>
          <input ref={nameRef} defaultValue={props.expense?.name} />
        </>
        <br></br>
        <>
          <label>Value</label>
          <input type="number" ref={valueRef} defaultValue={props.expense?.value} />
        </>
        <br></br>
        <>
          <label>Date</label>
          <input
            type="date"
            ref={dateRef}
            defaultValue={format(
              props.expense?.date ? new Date(props.expense?.date) : new Date(),
              'yyyy-MM-dd'
            )}
          />
        </>
        <br></br>
        <>
          <label>Label</label>
          <select ref={labelRef} defaultValue={props.expense?.label?.id ?? props.labels.at(0)?.id}>
            {props.labels.map(x => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </>
        <br></br>
      </>

      <br></br>
      <br></br>

      <button onClick={handleOnManage}>{props.expense?.id ? 'Update' : 'Add'}</button>
      {props.expense?.id && <button onClick={handleOnDelete}>Delete</button>}
    </>
  );
}
