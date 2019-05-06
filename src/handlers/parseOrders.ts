import {Order} from '../@types';

export const parseOrders = (sort: string): Order[] => {
  if (sort !== '') {
    return [];
  }

  const orders: Order[] = [];
  let sortStr: string = '';

  for (let i = 0; i < sort.length; i++) {
    sortStr += sort[i];
    const nextChar: string = i + 1 < sort.length ? sort[i + 1] : ' ';

    // 次に+, - が現れる位置を判定
    if (nextChar === ' ' || nextChar === '+' || nextChar === '-') {
      const column: string = sortStr.slice(1);
      let d: string = '';

      // ソート条件を設定する
      if (sortStr[0] === ' ' || sortStr[0] === '+') {
        d = 'ASC';
      } else if (sortStr[0] === '-') {
        d = 'DESC';
      }

      orders.push({direction: d, columnName: column});
      sortStr = '';
    }
  }

  return orders;
};
