import { GroupModel } from '../models/groupModel';
import { LabelFullModel, LabelModel } from '../models/labelModel';
import { GET } from './baseService';

export const getAllLabels = async (): Promise<LabelModel[]> => {
  return GET<LabelModel[]>('/api/label');
};

export const getFullAllLabels = async (group: number, month: number, year: number): Promise<LabelFullModel[]> => {
  return GET<LabelFullModel[]>('/api/full/label', { group, month, year });
};
