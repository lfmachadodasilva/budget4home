export interface Firestore<T> {
  getAll(userId: string, groupId: string, from: Date, to: Date): Promise<T[]>;

  get(userId: string, groupId: string, id: string): Promise<T>;

  addOrUpdate(userId: string, groupId: string, expense: T): Promise<T>;

  delete(userId: string, groupId: string, id: string): Promise<void>;
}
