'use strict';

import { app } from './app';

// Read the .env file.
import * as dotenv from 'dotenv';
dotenv.config();

// Require the framework
import Fastify from 'fastify';

// Instantiate Fastify with some config
const server = Fastify({
  logger: true
});

// Register your application as a normal plugin.
server.register(app);

export default async (req, res) => {
  await server.ready();
  server.server.emit('request', req, res);
};
