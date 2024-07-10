import { Request, Response, Application } from 'express';

import books from '../api/routes/books';
import user from '../api/routes/user';
import { jsonRpc } from '../json_rpc/server';

function getHome(req: Request, res: Response) {
  return res.status(200).json({
    architecture: {
      REST: { 'API': `${req.protocol}://${req.get('host')}/api/books`, docs: '' },
      RPC: { 'API': `${req.protocol}://${req.get('host')}/api/rpc`, docs: '' }
    }
  });
}

function getHomeRpc(req: Request, res: Response) {
  return res.status(200).json({
    message: "para poder acceder a la api RPC debes usar un cliente http por ejemplo postman, usando el metodo POST."
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
  route.use('/api', books);
  route.use('/api', user);
  // RPC
  route.get('/api/rpc', getHomeRpc);
  route.post('/api/rpc', jsonRpc);
  // Rutas que no se encuentren
  route.use(notFound);
};
