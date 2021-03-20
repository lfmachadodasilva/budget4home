export class Routes {
  static home = '/';
  static auth = '/auth';
  static settings = '/settings';
  static import = '/import';
  static export = '/export';
  static group = '/group';
  static groupManage = '/group/:id';
  static label = '/label';
  static labelManage = '/label/:groupId/:id';
  static labelAdd = '/label/add/:groupId';
  static labelEdit = '/label/edit/:id';
  static expense = '/expense';
  static expenseManage = '/expense/:groupId/:id';
  static expenseAdd = '/expense/:groupId';
  static expenseEdit = '/expense/:groupId/:id';
}
