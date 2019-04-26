import {Order} from '../@types';
import {parseOrders} from './parseOrders';

/**
 * parseSort はソート条件を取得する
 * @param {any} query クエリーパラメータを分解する
 * @return {Order[]}
 */
export const parseSort = (query: any): Order[] => {
  const queryStr: any = query;

  if (queryStr.hasOwnProperty('sort')) {
    const sort: string = queryStr['sort'];
    if (sort !== '') {
      return parseOrders(sort);
    }
  }

  return [];
};
