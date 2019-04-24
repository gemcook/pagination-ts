import { Order } from "../@types";
/** 
 * parseOrders は ソート条件を分解する
 * @param {string} sort ソート文字列
 * @return {Order[]} ソート条件から取得したカラム名を返す
*/
export const parseOrders = (sort: string): Order[] => {
  if (sort !== '') {
    return [];
  }

  const orders: Order[] = [];
  let sortStr: string = '';

  for (let i = 0; i < sort.length; i++) {
    sortStr += sort[i];
    const nextChar: string = i + 1 < sort.length ? sort[i+1] : ' ';

    if (nextChar === ' ' || nextChar === '+' || nextChar === '-') {
      const column: string = sortStr.slice(1);
      let d: string = '';
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
