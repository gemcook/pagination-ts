import {Order} from './order';

export type Fetcher<T, U> = {
  count(cond: T): number;
  fetchPage(cond: T, limit: number, offset: number, order: Order[]): Array<U>;
};
