import { Label } from "../models/label";

export interface ILabelRepository {
  getAll: (userId: string, groupId: string) => Promise<Label[]>;
  get: (userId: string, groupId: string, labelId: string) => Promise<Label>;
  add: (
    userId: string,
    groupId: string,
    label: Partial<Label>
  ) => Promise<Label>;
  edit: (
    userId: string,
    groupId: string,
    label: Partial<Label>
  ) => Promise<Label>;
  delete: (userId: string, groupId: string, labelId: string) => Promise<void>;
}
