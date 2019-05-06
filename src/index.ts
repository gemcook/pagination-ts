import {parseQuery, fetch} from './handlers';
import {Pagination} from './@types';

const pagination: Pagination = {
  parseQuery,
  fetch,
};

export default pagination;
