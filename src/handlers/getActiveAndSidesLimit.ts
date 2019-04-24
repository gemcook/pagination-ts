import { Pager } from "../@types";
import {startPageIndex} from './'

/**
 * getActiveAndSidesLimit gets records count and offset of page chunk
 * @param {Pager<T, U>} pager pagerを渡す
 * @return {number}: limitとoffsetを返す 
*/
export const getActiveAndSidesLimit = <T, U>(pager: Pager<T, U>)
: {limit: number, offset: number} => {
  // start record index of side pages chunk
  let offset = startPageIndex(pager) * pager.limit;
  if (offset > pager.totalCount) {
    offset = pager.totalCount - 1;
  }

  // data record limit of side pages chunk
  let limit = ( (pager.sidePagingCount * 2) + 1) * pager.limit;
  if(limit > pager.totalCount) {
    limit = pager.totalCount;
  }

  return {limit, offset};
};
