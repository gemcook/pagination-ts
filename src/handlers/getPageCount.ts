import { Pager } from "../@types";

/**
 * getPageCount は ページの総数を返します
 * @param {Pager<T, U>} pager 
 * @return {number} ページの総数を返します
*/
export const getPageCount = <T, U>(pager: Pager<T, U>): number => {
  if (pager.limit === 0) {
    return 0;
  }

  const count = Math.ceil(pager.totalCount / pager.limit);
  return count;
};
