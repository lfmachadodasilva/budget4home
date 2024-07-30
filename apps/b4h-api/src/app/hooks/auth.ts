import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

export const authHook = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  // request.context = { ...request.context, userId: 'userId' } as any;

  console.log('authHook', { body: request.body, header: request.headers });

  done();
};
