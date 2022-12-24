import { InferGetServerSidePropsType } from 'next/types';
import { B4hHeader } from '../../header';
import { getServerSideProps } from './server';

export function Labels(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h5>Labels</h5>
      <B4hHeader />
      <br></br>
      <br></br>
      {props.labels.map(label => {
        return (
          <div key={label.id}>
            <label>{label.id}</label> - <label>{label.name}</label>
          </div>
        );
      })}
    </>
  );
}
