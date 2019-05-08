import {Pager} from '../@types';
import {startPageIndex, lastPageIndex} from './pageIndex';
import _ from 'lodash';

export const formatResponse = <T, U>(
  first: Array<U>,
  activeAndSides: Array<U>,
  last: Array<U>,
  pager: Pager<T, U>
): any => {
  const active: any = [];
  const sidesLen: number = pager.sidePagingCount * 2;
  const sides: any = [];

  for (let i = 0; i < sidesLen; i++) {
    sides.push([]);
  }

  let page: number = startPageIndex(pager) + 1;
  let pageIndex: number = 0;

  for (let i = 0; i < activeAndSides.length; i++) {
    // fill the active page data
    if (page === pager.page) {
      active.push(activeAndSides[i]);
    }

    // fill the side pages sequentially
    if (page !== pager.page) {
      sides[pageIndex].push(activeAndSides[i]);
    }

    // fill the first, if the chunk data has the first page
    if (page === 1) {
      first.push(activeAndSides[i]);
    }

    // fill the last, if the chunk data has the last page
    if (lastPageIndex(pager) + 1 === page) {
      last.push(activeAndSides[i]);
    }

    // ページの区切り
    if ((i + 1) % pager.limit === 0) {
      page++;
      if (pageIndex < sidesLen && sides[pageIndex].length > 0) {
        pageIndex++;
      }
    }
  }

  // name pages
  const responsePage: any = [];
  responsePage['active'] = active;
  responsePage['first'] = first;
  responsePage['last'] = last;

  for (let i = 0; i < sides.length; i++) {
    const pageName: string = getPageName(i);
    responsePage[pageName] = sides[i];

    if (sides[i].length === 0) {
      responsePage[pageName] = null;
    }
  }

  // 最後の値が存在しないとき
  if (last.length === 0) {
    responsePage['last'] = responsePage['active'];
  }

  return responsePage;
};

export const getPageName = (index: number): string => {
  switch (index) {
    case 0:
      return 'before_distant';
    case 1:
      return 'before_near';
    case 2:
      return 'after_near';
    case 3:
      return 'after_distant';
    default:
      return _.toString(index);
  }
};
