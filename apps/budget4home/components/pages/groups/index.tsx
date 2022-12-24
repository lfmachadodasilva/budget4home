import { InferGetServerSidePropsType } from 'next/types';
import { B4hHeader } from '../../header';
import { getServerSideProps } from './server';

export function Groups(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h5>Groups</h5>
      <B4hHeader />
      <br></br>
      <br></br>
      {props.groups.map(group => {
        return (
          <div key={group.id}>
            <label>{group.id}</label> - <label>{group.name}</label>
          </div>
        );
      })}
    </>
  );
}
