export interface UserModel {
  id: string;
  name: string;
  email: string;
  photoUrl: string | null | undefined;
}

export const defaultUserModel: UserModel[] = [
  {
    id: '01',
    name: 'Name1',
    email: 'name1@email.com',
    photoUrl: null
  },
  {
    id: '02',
    name: 'Name2',
    email: 'name2@email.com',
    photoUrl: null
  },
  {
    id: '03',
    name: 'Name3',
    email: 'name3@email.com',
    photoUrl: null
  }
];
