import {toString} from 'lodash';

/**
 * getPageName returns named page
 * @param {number} index インデックス
 * @return {string}
*/
export const getPageName = (index: number): string => {
  switch(index) {
    case 0:
      return 'before_distant';
    case 1:
      return 'before_near';
    case 2:
      return 'after_near';
    case 3:
      return 'after_distant';
    default:
      return toString(index);
  };
};
