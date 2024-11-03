# firebase-admin

The `@b4h/firebase-admin` library provides a convenient wrapper around the [npm Firebase Admin](https://www.npmjs.com/package/firebase-admin) package from Google. With this library, you can easily manage Firebase features such as authentication, firebase, cloud storage, and more, without dealing with the complexities of the underlying Firebase Admin API.

attention: this component is only available by server components

### example

```ts
"use server";

import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';

export const ServerComponent = () => {
  const docs = await getFirebaseAdminFirestore()

  ...
}

```
