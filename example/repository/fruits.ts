import {model} from '../model';
import {Op} from 'sequelize';
import {parseQuery, fetch, Fetcher, Order} from '@gemcook/pagination-ts';
import {Fruits, FruitCondition} from '../@types';
import _ from 'lodash';

const getPagination = async (query: any) => {
  const pagination = parseQuery(query);
  const cond = parseFruitCondition(query);

  try {
    const data = await fetch(fruitsFetch, {
      limit: pagination.limit,
      page: pagination.page,
      cond,
      orders: pagination.sort,
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// 条件を取得する
const parseFruitCondition = (query: any) => {
  if (query.hasOwnProperty('price_range')) {
    const priceStr: string = query['price_range'];
    if (priceStr !== '') {
      const prices: any = priceStr.split(',');
      const low: number = _.parseInt(prices[0]);
      const high: number = _.parseInt(prices[1]);

      return {low, high};
    }
  }

  const low = -1 << 31;
  const high = 1 << (31 - 1);
  return {low, high};
};

// Fetcher関数を作成する
const fruitsFetch: Fetcher<FruitCondition, Fruits> = {
  count: async (cond: FruitCondition): Promise<number> => {
    try {
      const count: number = await model.Fruit.count({
        where: {
          price: {
            [Op.between]: [cond.low, cond.high],
          },
        },
      });

      return count;
    } catch (error) {
      throw new Error(error);
    }
  },
  fetchPage: async (
    cond: FruitCondition,
    limit: number,
    offset: number,
    order: Order[]
  ): Promise<Array<Fruits>> => {
    // Orderをsequelizeのorder文にあう形に変換する
    const newOrder: any = [];
    for (let i = 0; i < order.length; i++) {
      newOrder.push([order[i].columnName, order[i].direction]);
    }

    try {
      const fruits: Fruits[] = await model.Fruit.findAll({
        where: {
          price: {
            [Op.between]: [cond.low, cond.high],
          },
        },
        order: newOrder,
      });

      let toIndex: number = offset + limit;
      if (toIndex > fruits.length) {
        toIndex = fruits.length;
      }
      const newFruits: Fruits[] = fruits.slice(offset, toIndex);

      return newFruits;
    } catch (error) {
      throw new Error();
    }
  },
};

export const fruitsRepository = {
  getPagination,
};
