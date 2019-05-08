import {Request, Response, NextFunction} from 'express';
import {fruitsService} from '../service';

export const getFruitsPagination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const service = fruitsService;

  try {
    const {pages, totalCount, totalPage} = await service.getPagination(
      req.query
    );

    res.setHeader('X-Total-Count', totalCount);
    res.setHeader('X-Total-Pages', totalPage);

    res.json({pages});
  } catch (error) {
    next(error);
  }
};

export const fruitsHandler = {
  getFruitsPagination,
};
