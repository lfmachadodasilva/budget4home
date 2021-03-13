import { LabelFullModel, LabelModel } from '../models/labelModel';
import { GET, POST } from './baseService';

export const getAllLabels = async (group: number): Promise<LabelModel[]> => {
  return GET<LabelModel[]>('/api/label', { groupId: group });
};

export const getFullAllLabels = async (group: number, month: number, year: number): Promise<LabelFullModel[]> => {
  return GET<LabelFullModel[]>('/api/full/label', { group, month, year });
};

export const addLabel = async (name: string, group: number): Promise<number> => {
  return POST<number>('/api/label', {}, { name, groupId: group });
};
