import express from 'express';
import logger from 'morgan';
import {Request, Response, NextFunction} from 'express';
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

// eslint-disable-next-line
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: 500,
    error: error.message,
  });
});

app.listen(8888, () => {
  console.info(
    'http://localhost:8888/fruits?limit=2&page=1&price_range=100,300&sort=+price'
  );
});
