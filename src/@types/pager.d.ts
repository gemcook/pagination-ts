import {Fetcher, Order} from './';

export type Pager<T, U> = {
  limit: number;
  page: number;
  sidePagingCount: number;
  totalCount: number;
  condition: T;
  orders: Order[];
  fetcher: Fetcher<T, U>;
};