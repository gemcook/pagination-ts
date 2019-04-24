import {Order} from './order';

export type Setting<T> = {
  limit: number;
  page: number;
  cond: T;
  orders: Order[];
};
