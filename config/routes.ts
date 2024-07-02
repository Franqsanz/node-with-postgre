import { Request, Response, Application } from 'express';

import books from '../api/routes/books';

function getHome(req: Request, res: Response) {
  try {
    return res.status(200).json({
      architecture: {
        rest: { 'API REST': `${req.protocol}://${req.get('host')}/api/books`, docs: '' },
        // rpc: { 'API RPC': `${req.protocol}://${req.get('host')}/api/books`, docs: '' }
      }
    });
  } catch (error) {
    throw error;
  }
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
  route.get('/', getHome);
  route.get('/api', getRedirect);
  route.use('/api/', books);
  route.use(notFound);
};
