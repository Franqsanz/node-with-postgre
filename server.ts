import express from 'express';
import { config } from 'dotenv';

import { configMiddlewares, configRoutes } from './configs/index';

const app = express();
const port = process.env.PORT || 6985;
config();

configMiddlewares(app);
configRoutes(app);

app.listen(port, () => console.log(`server ready on port ${port}`));
