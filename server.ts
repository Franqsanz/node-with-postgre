import express from 'express';

import { configMiddlewares, configRoutes } from './config/index';

const app = express();
const port = process.env.PORT || 6985;

configMiddlewares(app);
configRoutes(app);

app.listen(port, () => console.log(`server ready on port ${port}`));
