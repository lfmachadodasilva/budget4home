import { FastifyInstance } from 'fastify';
import { getGroups } from '../repositories/group/groupRepository';

export default async function (fastify: FastifyInstance) {
  const url = '/api/groups';

  const delay = (millis: number) =>
    new Promise((resolve, reject) => {
      setTimeout(_ => resolve(1), millis);
    });

  fastify.get(
    url,
    // {
    //   preHandler: authHook
    // },
    async function (request, reply) {
      // await delay(5000);

      return await getGroups('userId');
    }
  );

  // fastify.post<{
  //   Body: LabelModel;
  //   Params: ParamsModel;
  // }>(url, async function (request, reply) {
  //   const { groupId } = request.params;
  //   const body = request.body;

  //   // await delay(5000);

  //   return await addLabel(groupId, 'userId', body);
  // });

  // fastify.put<{
  //   Body: LabelModel;
  //   Params: ParamsModel;
  // }>(url + '/:labelId', async function (request, reply) {
  //   const { groupId, labelId } = request.params;
  //   const body = request.body;

  //   // await delay(5000);

  //   return await updateLabel(groupId, 'userId', labelId, body);
  // });

  // fastify.delete<{
  //   Params: ParamsModel;
  // }>(url + '/:labelId', async function (request, reply) {
  //   const { groupId, labelId } = request.params;

  //   // await delay(5000);

  //   return await deleteLabel(groupId, 'userId', labelId);
  // });
}
