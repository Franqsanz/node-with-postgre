import { Request, Response, Application } from 'express';

import books from '../api/routes/books';
import user from '../api/routes/user';
import { jsonRpc } from '../json_rpc/server';

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
    message: "Para poder acceder a la API JSON-RPC debes usar un cliente HTTP por ejemplo postman, usando el metodo POST."
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
