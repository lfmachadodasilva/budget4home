import { LabelModel } from '@b4h/models';
import { B4hApiRoutes } from '../config/routes';

const headers: HeadersInit = {
  'Content-Type': 'application/json'
};

export const getLabelsFetch = (groupId: string): Promise<LabelModel[]> =>
  fetch(B4hApiRoutes.labels(groupId), { method: 'GET', headers }).then(res => res.json());

export const addLabelFetch = async (groupId: string, label: LabelModel): Promise<LabelModel> =>
  fetch(B4hApiRoutes.labels(groupId), {
    method: 'POST',
    body: JSON.stringify(label),
    headers
  }).then(res => res.json());

export const updateLabelFetch = async (groupId: string, labelId: string, label: LabelModel) =>
  fetch(B4hApiRoutes.label(groupId, labelId), {
    method: 'PUT',
    body: JSON.stringify(label),
    headers
  }).then(_ => {});

export const deleteLabelFetch = async (groupId: string, labelId: string): Promise<void> =>
  fetch(B4hApiRoutes.label(groupId, labelId), {
    method: 'DELETE',
    headers
  }).then(_ => {});
