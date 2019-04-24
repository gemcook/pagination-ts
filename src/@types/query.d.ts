import {Order} from './';

export type Query = {
  limit: number;
  page: number;
  sort: Order[];
};
