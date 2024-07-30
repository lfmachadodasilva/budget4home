import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
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
    async function (request: FastifyRequest, replay: FastifyReply) {
      // await delay(5000);

      const groups = await getGroups('userId');
      replay.code(200).send(groups);
    }
  );
}
