import {Pager} from '../@types';

/**
 * lastPageIndex returns the last page index
 * @param {Pager<T, U>} pager
 * @return {number} 最後のページ番号を返す
 */
export const lastPageIndex = <T, U>(pager: Pager<T, U>): number => {
  if (pager.totalCount < 1 || pager.limit === 0) {
    return 0;
  }

  // calculate the last page index
  const lastPageIndex: number = Math.ceil((pager.totalCount - 1) / pager.limit);
  return lastPageIndex;
};
