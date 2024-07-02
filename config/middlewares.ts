import express, { Application } from 'express';
import compression from 'compression';

export function configMiddlewares(app: Application) {
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(compression());
  app.disable('x-powered-by');
}
