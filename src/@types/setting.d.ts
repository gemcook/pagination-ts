import {Order} from './';

export type Setting<T> = {
  limit: number;
  page: number;
  cond: T;
  orders: Order[];
};
