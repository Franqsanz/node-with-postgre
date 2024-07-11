import { Request, Response } from 'express';
import { JSONRPCServer } from 'json-rpc-2.0';

import { findAll, findOne } from './methods/methods';
import './tcp/server_tcp';

const server = new JSONRPCServer();

// Define los métodos RPC
server.addMethod('books', ({ limit, page }) => {
  return findAll(limit, page);
});

server.addMethod('bookOne', ({ id }) => {
  return findOne(id);
});

export function jsonRpc(req: Request, res: Response) {
  const jsonRPC = req.body;
  // server.receive takes a JSON-RPC request and returns a promise of a JSON-RPC response.
  // It can also receive an array of requests, in which case it may return an array of responses.
  // Alternatively, you can use server.receiveJSON, which takes JSON string as is (in this case req.body).
  server.receive(jsonRPC).then((jsonRPC) => {
    if (jsonRPC) {
      res.json(jsonRPC);
    } else {
      // If response is absent, it was a JSON-RPC notification method.
      // Respond with no content status (204).
      res.sendStatus(204);
    }
  });
}
