import { GetServerSideProps } from "next/types";
import { Label } from "../../../modals/label";
import { FirestoreCollections } from "../../../repositories/collections";
import { firebaseAdminFirestore } from "../../../util/firebaseAdmin";

interface LabelsProps {
  labels: Label[];
}

export const getServerSideProps: GetServerSideProps<LabelsProps> = async context => {
  const labels: Label[] = [];
  try {
    const b4hCollections = await firebaseAdminFirestore
      .collection(FirestoreCollections.labels(context.query.groupId as string))
      .get();

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