import {Pager} from '../@types';

export const getPageCount = <T, U>(pager: Pager<T, U>): number => {
  if (pager.limit === 0) {
    return 0;
  }

  const count = Math.ceil(pager.totalCount / pager.limit);
  return count;
};
