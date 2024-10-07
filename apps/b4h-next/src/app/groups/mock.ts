import { GroupModel, UserModel } from '@b4h/models';

export const groups = [
  { id: '1', name: 'group1', userIds: ['1', '2'] },
  { id: '2', name: 'group2', userIds: ['1', '3'] },
  { id: '3', name: 'group3', userIds: ['1', '2'] }
] as GroupModel[];
export const users = [
  {
    id: '1',
    email: 'user1@email.com',
    displayName: 'user1',
    photoUrl: 'https://lfmachadodasilva.github.io/img/photo.png'
  },
  {
    id: '2',
    email: 'user2@email.com'
  },
  {
    id: '3',
    email: 'user3@email.com',
    displayName: 'user3'
  }
] as UserModel[];
