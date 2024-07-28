import { LabelModel } from '@b4h/models';
import { FastifyInstance } from 'fastify';
import { ParamsModel } from '../models/params';
import {
  addLabel,
  deleteLabel,
  getLabels,
  updateLabel
} from '../repositories/label/labelRepository';

export default async function (fastify: FastifyInstance) {
  const url = '/api/groups/:groupId/labels';

  const delay = (millis: number) =>
    new Promise((resolve, reject) => {
      setTimeout(_ => resolve(1), millis);
    });

  fastify.get(url, async function (request, reply) {
    // await delay(5000);
    return await getLabels('1', '1');
  });

  fastify.post<{
    Body: LabelModel;
    Params: ParamsModel;
  }>(url, async function (request, reply) {
    const { groupId } = request.params;
    const body = request.body;

    // await delay(5000);

    return await addLabel(groupId, body);
  });

  fastify.put<{
    Body: LabelModel;
    Params: ParamsModel;
  }>(url + '/:labelId', async function (request, reply) {
    const { groupId, labelId } = request.params;
    const body = request.body;

    // await delay(5000);

    return await updateLabel(groupId, labelId, body);
  });

  fastify.delete<{
    Params: ParamsModel;
  }>(url + '/:labelId', async function (request, reply) {
    const { groupId, labelId } = request.params;

    // await delay(5000);

    return await deleteLabel(groupId, labelId);
  });
}
