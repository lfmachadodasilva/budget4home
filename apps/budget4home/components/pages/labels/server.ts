import { GetServerSideProps } from 'next/types';
import { Label } from '../../../modals/label';
import { getAllLabels } from '../../../repositories/label';
import { firebaseAdminFirestore } from '../../../util/firebaseAdmin';

interface LabelsProps {
  labels: Label[];
}

export const getServerSideProps: GetServerSideProps<LabelsProps> = async context => {
  const labels: Label[] = [];
  try {
    const labelsEntity = await getAllLabels(firebaseAdminFirestore, '', context.query.groupId as string);

    labelsEntity.forEach(entity => {
      labels.push({
        id: entity.id,
        name: entity.name
      } as Label);
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
