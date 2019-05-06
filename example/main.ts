import express from 'express';
import logger from 'morgan';
import {Request, Response} from 'express';
import {fruitsRoutes} from './routes';

const app = express();

app.use(logger('dev'));

app.use('/fruits', fruitsRoutes);

/*
|--------------------------------
| Error Handling
|--------------------------------
*/
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    error: 'Page Not Found',
  });
});

app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({
    status: 500,
    error: 'Internal Server Error',
  });
});

app.listen(8888, () => {
  console.info(
    'http://localhost:8888/fruits?limit=2&page=1&price_range=100,300&sort=+price'
  );
});
