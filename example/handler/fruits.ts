import {Request, Response} from 'express';
import {fruitsService} from '../service';

export const getFruitsPagination = async (req: Request, res: Response) => {
  const service = fruitsService;
  const data = await service.getPagination(req.query);

  res.json(data);
  // const {totalCount, totalPages, pages} = service.getPagination(req.query);

  // res.setHeader('X-Total-Count', totalCount);
  // res.setHeader('X-Total-Pages', totalPages);

  // res.json({pages});
};

export const fruitsHandler = {
  getFruitsPagination,
};
