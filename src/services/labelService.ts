import { LabelFullModel, LabelModel } from '../models/labelModel';
import { DELETE, GET, POST, PUT } from './baseService';

export const getAllLabels = async (group: number): Promise<LabelModel[]> => {
  return GET<LabelModel[]>('/api/label', { groupId: group });
};

export const getFullAllLabels = async (group: number, month: number, year: number): Promise<LabelFullModel[]> => {
  return GET<LabelFullModel[]>('/api/full/label', { group, month, year });
};

export const getLabel = async (id: number): Promise<LabelModel> => {
  return GET<LabelModel>('/api/label/' + id);
};

export const addLabel = async (label: LabelModel, group: number): Promise<number> => {
  return POST<number>('/api/label', {}, { name: label.name, groupId: group });
};

export const editLabel = async (label: LabelModel, group: number): Promise<number> => {
  return PUT<number>('/api/label', {}, { id: label.id, name: label.name });
};

export const deleteLabel = async (id: number): Promise<number> => {
  return DELETE<number>('/api/label/' + id);
};
