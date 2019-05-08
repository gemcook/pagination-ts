import {Order} from './order';

export type Fetcher<T, U> = {
  count(cond: T): Promise<number> | number;
  fetchPage(
    cond: T,
    limit: number,
    offset: number,
    order: Order[]
  ): Promise<Array<U>> | Array<U>;
};
