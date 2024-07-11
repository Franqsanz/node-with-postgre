import { JSONRPCServer } from 'json-rpc-2.0';
import net from 'node:net';

import { findAll, findOne } from '../methods/methods';
import './client';

const server = new JSONRPCServer();

server.addMethod('books', ({ limit, page }) => {
  return findAll(limit, page);
});

server.addMethod('bookOne', ({ id }) => {
  return findOne(id);
});

const tcpServer = net.createServer((socket) => {
  socket.on('data', async (data) => {
    try {
      const request = JSON.parse(data.toString());

      const response = await server.receive(request);

      if (response) {
        console.log(response);
        socket.write(JSON.stringify(response) + '\n');
      }
    } catch (error) {
      console.error('Invalid JSON:', error);
      socket.write(JSON.stringify({ jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' } }) + '\n');
    }
  });
});

tcpServer.listen(4040, () => {
  console.log(`TCP server running on port 4040`);
});

module.exports = tcpServer;
