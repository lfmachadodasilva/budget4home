import { collection, getDocs, query } from 'firebase/firestore';
import { getFirebaseFirestore } from '../../config/firebase';

export const getGroups = async () => {
  getDocs(query(collection(getFirebaseFirestore(), 'budget4home')))
    .then(snapshot => {
      console.log(
        'collections',
        snapshot.docs.map(doc => doc.data())
      );
    })
    .catch(error => console.log('collections', error));
};
