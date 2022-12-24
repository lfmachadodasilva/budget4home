import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { B4hHeader } from '../../../../components/header';
import { Label } from '../../../../modals/label';
import { firebaseAdminFirestore } from '../../../../util/firebaseAdmin';

interface LabelsProps {
  labels: Label[];
}

export default function Labels(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

export const getServerSideProps: GetServerSideProps<LabelsProps> = async context => {
  const labels: Label[] = [];
  try {
    const b4hCollections = await firebaseAdminFirestore.collection(`budget4home/${context.query.groupId}/labels`).get();

    b4hCollections.forEach(doc => {
      labels.push({
        id: doc.id,
        name: doc.data().name
      });
    });
  } catch (e: any) {
    console.error('Fail to fetch labels', e);
  }

  return {
    props: {
      labels
    }
  };
};
