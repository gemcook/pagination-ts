import {Order} from '../@types';
import {parseOrders} from './parseOrders';

export const parseSort = (query: any): Order[] => {
  const sort: string = query.hasOwnProperty('sort') ? query['sort'] : '';

  if (sort !== '') {
    return parseOrders(sort);
  }

  return [];
};
