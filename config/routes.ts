import { Request, Response, Application } from 'express';

import books from '../apis/rest/routes/books';
import user from '../apis/rest/routes/user';
import { jsonRpc } from '../apis/json_rpc/http/server';

function getHome(req: Request, res: Response) {
  return res.status(200).json({
    architecture: {
      REST: { 'API': `${req.protocol}://${req.get('host')}/api/rest`, docs: '' },
      RPC: { 'API': `${req.protocol}://${req.get('host')}/api/rpc`, docs: '' }
    }
  });
}

function getHomeRest(req: Request, res: Response) {
  return res.status(200).json({
    books: `${req.protocol}://${req.get('host')}/api/rest/books`,
    users: `${req.protocol}://${req.get('host')}/api/rest/users`,
  });
}

function getHomeRpc(req: Request, res: Response) {
  return res.status(200).json({
    message: "To access the JSON-RPC API you must use an HTTP client such as Postman, using the POST method. It is also possible to connect via TCP using for example Ncat."
  });
}

function getRedirect(req: Request, res: Response) {
  try {
    return res.status(200).redirect('/');
  } catch (error) {
    throw error;
  }
}

function notFound(req: Request, res: Response) {
  try {
    return res.status(200).json({ message: { error: `Esta ruta no existe: ${req.originalUrl}` } });
  } catch (error) {
    throw error;
  }
}

export function configRoutes(route: Application) {
  // REST
  route.get('/', getHome);
  route.get('/api', getRedirect);
  route.get('/api/rest', getHomeRest);
  route.use('/api/rest/books', books);
  route.use('/api/rest/users', user);
  // RPC
  route.get('/api/rpc', getHomeRpc);
  route.post('/api/rpc', jsonRpc);
  // Rutas que no se encuentren
  route.use(notFound);
};
