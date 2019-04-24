import {Order} from './order';
import {Fetcher} from './fetcher';

export type Pager<T, U> = {
  limit: number;
  page: number;
  sidePagingCount: number;
  totalCount: number;
  condition: T;
  orders: Order[];
  fetcher: Fetcher<T, U>;
};
