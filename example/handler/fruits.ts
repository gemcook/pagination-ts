import {Request, Response, NextFunction} from 'express';
import {fruitsService} from '../service';

/** 
 * ページネーション用ハンドラ_フルーツを取得します
 * @param {Request} req リクエスト引数
 * @param {Response} res レスポンス引数
 * @param {NextFunction} next
*/
export const getFruitsPaging = (req: Request, res: Response, next: NextFunction) => {
  const service = fruitsService;
  const {totalCount, totalPages, pages} = service.getPaging(req.query);

  res.setHeader('X-Total-Count', totalCount);
  res.setHeader('X-Total-Pages', totalPages);
  
  res.json({pages});
}

export const fruitsHandler = {
  getFruitsPaging
};

