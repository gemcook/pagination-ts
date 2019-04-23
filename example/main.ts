import * as express from 'express';
import {Request, Response, NextFunction} from 'express';
import {fruitsRoutes} from './routes';

const app = express();

app.use('/fruits', fruitsRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 404,
    error: 'Page Not Found',
  });
});

app.listen(8888, () => {
  console.log('http://localhost:8888/fruits?limit=2&page=1&price_range=100,300&sort=+price');
});