import {Fruits} from '../data';
import {Pagination} from '../../src';
import {fetcher, fruitCondition, order} from '../types';
import {Fruit} from '../model';

/** 
 * 全件取得
*/
const getAll = () => {
  return Fruits;
};

/**
 * ページネーション用レポジトリ_フルーツを取得します
 * @param {query} クエリーパラメータ
*/
const getPaging = (query: any) => {
  const pagination = Pagination;
  const p = pagination.parseQuery(query);

  // 条件を作成
  const parseFruitCondition = (query: any) => {
    if (query.hasOwnProperty('price_range')) {
      const priceStr: string = query['price_range'];
      if (priceStr !== '') {
        const prices: any = priceStr.split(',');
        const low: number = parseInt(prices[0]);
        const high: number = parseInt(prices[1]);

        return {low, high};
      }
    }
    const low = -1 << 31;
    const high = 1 << 31 - 1;
    return {low, high};
  };
  const cond = parseFruitCondition(query);

  // fetcher関数を作成する
  const fruitsFetch: fetcher<fruitCondition, Fruit> = {
    count: (cond: fruitCondition): number => {
      const result = Fruits.filter(fruit => {
        return fruit.Price >= cond.low && fruit.Price <= cond.high;
      });
      return result.length;
    },
    
    fetchPage: (
      cond: fruitCondition,
      limit: number,
      offset: number,
      orders: order[],
    ): Array<Fruit> => {
      const fruits = Fruits.filter(fruit => {
        return fruit.Price >= cond.low && fruit.Price <= cond.high;
      });
      let toIndex = offset + limit;
      if (toIndex > fruits.length) {
        toIndex = fruits.length;
      }
      fruits.sort((a, b) => {
        if (a.Price < b.Price) return -1;
        if (a.Price > b.Price) return 1;
        return 0;
      });
      const newFruits = fruits.slice(offset, toIndex);

      return newFruits;
    }
  };

  const data = pagination.fetch(fruitsFetch, {
    limit: p.limit,
    page: p.page,
    cond,
    orders: p.sort,
  });
  
  return data;
};


export const fruitsRepository = {
  getAll,
  getPaging,
};
