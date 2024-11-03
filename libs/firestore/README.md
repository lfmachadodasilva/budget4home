# firestore

# firestore

The `@b4h/firestore` library provides seamless access to Firestore documents for the Budget4Home project. This library is designed to simplify interactions with Firestore, allowing you to manage and query your budget4home-related data efficiently.

### example

```ts
import { getLabelsFirestore } from '@b4h/firestore';

const userId = 'userId';
const groupId = 'groupId';

const labels = await getLabelsFirestore(userId, groupId);
```
