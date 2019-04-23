import {Order} from './';

export type fetcher<T, U> = {
  count(cond: T): number;
  fetchPage(
    cond: T,
    limit: number,
    offset: number,
    orders: Order[],
  ): Array<U>;
};
