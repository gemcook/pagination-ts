import {Order} from './';

export class Setting {
  public limit: number = 0;
  public page: number = 0;
  cond: any;
  public orders: Order[] = [];
}
