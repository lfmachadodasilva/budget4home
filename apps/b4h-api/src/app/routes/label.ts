import { FastifyInstance } from 'fastify';
import { getLabels } from '../repositories/label/labelRepository';

export default async function (fastify: FastifyInstance) {
  fastify.get('/labels', async function (request, reply) {
    return await getLabels('1', '1');
  });
}
