import express, { Request, Response } from 'express';

import books from './routes/books';

const app = express();
const port = process.env.PORT || 6985;

app.use('/api', books);

app.listen(port, () => console.log(`server ready on port ${port}`));