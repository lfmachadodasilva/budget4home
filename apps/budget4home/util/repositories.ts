import {
  IExpenseRepository,
  IGroupRepository,
  ILabelRepository,
  IUserRepository,
} from "@budget4home/base";
import {
  ExpenseRepository,
  GroupRepository,
  LabelRepository,
  UserRepository,
} from "@budget4home/firestore-repositories";

import { firebaseAdminAuth, firebaseAdminFirestore } from "./firebaseAdmin";

export const groupRepository: IGroupRepository = new GroupRepository(
  firebaseAdminFirestore
);

export const expenseRepository: IExpenseRepository = new ExpenseRepository(
  firebaseAdminFirestore,
  groupRepository
);

export const labelRepository: ILabelRepository = new LabelRepository(
  firebaseAdminFirestore,
  groupRepository
);

export const userRepository: IUserRepository = new UserRepository(
  firebaseAdminAuth
);
