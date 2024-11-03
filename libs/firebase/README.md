# firebase

The `@b4h/firebase` library provides a convenient wrapper around the [npm Firebase](https://www.npmjs.com/package/firebase) package. With this library, you can easily access Firebase features such as authentication, firestore, cloud storage, and more, without dealing with the complexities of the underlying Firebase API.

### example

```ts
import { useB4hAuth } from '@b4h/firebase';

export const B4hMenuMain = () => {
  const { user } = useB4hAuth();

  ...
}

```
