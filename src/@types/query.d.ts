import {Order} from './order';

export type Query = {
  limit: number;
  page: number;
  sort: Order[];
};
