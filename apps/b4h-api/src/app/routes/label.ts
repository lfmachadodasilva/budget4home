import { addOrUpdateLabel, getLabels } from '@b4h/firestore';
import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get('/labels', async function (request, reply) {
    return await getLabels('1', '1');
  });

  fastify.post('/labels', async function (request, reply) {
    const label = request.body;
    console.log('----------', { label });
    return await addOrUpdateLabel(label, '1', '1');
  });
}
