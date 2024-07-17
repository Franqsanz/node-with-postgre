import { JSONRPCServer } from 'json-rpc-2.0';
import net from 'node:net';

import { findAll, findOne } from '../methods/methods';

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
      console.log('Request:', data.toString());

      const request = JSON.parse(data.toString());
      const response = await server.receive(request);

      if (response) {
        return socket.write(JSON.stringify(response) + '\n');
      }
    } catch (err) {
      console.error('Invalid JSON:', err);
      return socket.write(JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32700,
          message: 'Parse error'
        }
      }) + '\n');
    }
  });

  socket.on('error', (err) => {
    if (err.name !== 'EADDRINUSE' && err.name !== 'EACCES') {
      console.log('Error EADDRINUSE');
      // setTimeout(() => {
      //   console.log('Restarting server...');
      // }, 1000); // Esperar un segundo antes de intentar reiniciar
    }
  });
});

tcpServer.listen(4040, () => {
  console.log(`TCP server running on port 4040`);
});
