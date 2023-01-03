import { IGroupRepository } from "@budget4home/base";
import { GroupRepository } from "@budget4home/firestore-repositories";

import { firebaseAdminFirestore } from "../util/firebaseAdmin";

export const groupRepository: IGroupRepository = new GroupRepository(
  firebaseAdminFirestore
);
