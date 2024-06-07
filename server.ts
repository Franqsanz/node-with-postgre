import express from 'express';
import compression from 'compression';
import { config } from 'dotenv';

import books from './api/routes/books';

const app = express();
const port = process.env.PORT || 6985;
config();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(compression());
app.disable('x-powered-by');

app.use('/api', books);

app.listen(port, () => console.log(`server ready on port ${port}`));
