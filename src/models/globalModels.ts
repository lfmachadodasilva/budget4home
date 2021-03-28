import { GroupModel } from './groupModel';

export interface GlobalModel {
  isLoading: boolean;

  groups: GroupModel[];
  years: number[];

  group: number;
  month: number;
  year: number;

  onChange: (group: number, month: number, year: number) => void;
  onReload: () => void;
}

const today = new Date();
export const defaultGlobalModel: GlobalModel = {
  isLoading: true,

  groups: [],
  years: [],

  group: 1,
  month: today.getMonth() + 1,
  year: today.getFullYear(),

  onChange: () => {},
  onReload: () => {}
};
