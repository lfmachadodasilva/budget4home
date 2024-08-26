import { firebaseAdmin } from './firebase-admin';

describe('firebaseAdmin', () => {
  it('should work', () => {
    expect(firebaseAdmin()).toEqual('firebase-admin');
  });
});
