import {Order, Query, Setting, fetcher} from './';
import {string, number, cond} from '../utils';

export class Pagination {
  public limit: number = 0;
  public page: number = 0;
  public sidePagingCount: number = 2;
  public totalCount: number = 0;
  public orders: Order[] = [];
  public condition: any;
  public fetcher: fetcher<any, any>;

  /**
   * paginationパラメータの初期値をセットする関数
   */
  init() {
    this.limit = 10;
    this.page = 1;
    this.sidePagingCount = 2;
  }

  /**
   * 最初のページ番号を取得する
   * @return {number}
   */
  startPageIndex(): number {
    let startPageIndex = this.page - 1 - this.sidePagingCount;

    // 最終ページを含む場合は取得開始位置を調整する
    const endPageIndex = startPageIndex + this.sidePagingCount * 2;
    if (endPageIndex > this.lastPageIndex()) {
      startPageIndex = startPageIndex - (endPageIndex - this.lastPageIndex());
    }

    if (startPageIndex < 0) {
      startPageIndex = 0;
    }

    return startPageIndex;
  }

  /**
   * 最後のページ番号を取得する
   * @return {number}
   */
  lastPageIndex(): number {
    if (this.totalCount < 1 || this.limit === 0) {
      return 0;
    }

    // 最後のページ番号を計算する
    const lastPageIndex = Math.ceil((this.totalCount - 1) / this.limit);
    return lastPageIndex;
  }

  /**
   * ページ数のレコード数とオフセットを取得します
   */
  getActiveAndSidesLimit() {
    // start record index of side pages chunk
    let offset = this.startPageIndex() * this.limit;
    if (offset > this.totalCount) {
      offset = this.totalCount - 1;
    }

    // data record limit of side pages chunk
    let limit = (this.sidePagingCount * 2 + 1) * this.limit;
    if (limit > this.totalCount) {
      limit = this.totalCount;
    }

    return {limit, offset};
  }

  /**
   * ページの総数を取得します
   * @return {number} ページの総数を返します
   */
  getPageCount(): number {
    if (this.limit === 0) {
      return 0;
    }
    const count = Math.ceil(this.totalCount / this.limit);
    return count;
  }

  /**
   * Fetch returns paging response using arbitary record fetcher
   */
  fetch<T, U>(fetcher: fetcher<T, U>, setting: Setting) {
    const pager = this.newPager(fetcher, setting);
    if (pager === null) {
      return {totalCount: 0, totalPages: 0, res: null};
    }
    const res = pager.getPages();
    if (res === null) {
      return {totalCount: 0, totalPages: 0, res: null};
    }

    const response = {
      active: res['active'],
      first: res['first'],
      last: res['last'],
      before_distant: res['before_distant'],
      before_near: res['before_near'],
      after_near: res['after_near'],
      after_distant: res['after_distant'],
    };

    return {
      totalCount: pager.totalCount,
      totalPages: pager.getPageCount(),
      pages: response,
    };
  }

  /**
   *
   */
  newPager<T, U>(fetcher: fetcher<T, U>, setting: Setting) {
    this.init();
    this.fetcher = fetcher;

    if (setting.limit !== 0) {
      this.limit = setting.limit;
    }

    if (setting.page !== 0) {
      if (setting.page < 1) {
        return null;
      } else {
        this.page = setting.page;
      }
    }

    // currently side pages count is fixed to 2
    this.sidePagingCount = 2;

    this.condition = setting.cond;
    this.orders = setting.orders;

    return this;
  }

  /**
   * getPages gets formated paging response
   */
  getPages() {
    const count = this.fetcher.count(this.condition);
    this.totalCount = count;

    const pageCount = this.getPageCount();
    if (pageCount === 0) {
      return this.formatResponse([], [], []);
    }

    if (this.page > pageCount) {
      return null;
    }

    // activeとsidesに相当する範囲をまとめて取得する
    const {limit, offset} = this.getActiveAndSidesLimit();
    const activeAndSides = this.fetcher.fetchPage(
      this.condition,
      limit,
      offset,
      this.orders
    );

    // 最初のページが範囲外の場合は取得する
    const first =
      this.startPageIndex() > 0
        ? this.fetcher.fetchPage(this.condition, this.limit, 0, this.orders)
        : [];

    // 最後のページが範囲外の場合は取得する
    const last =
      this.startPageIndex() + this.sidePagingCount * 2 < this.lastPageIndex()
        ? this.fetcher.fetchPage(
            this.condition,
            this.limit,
            this.lastPageIndex() * this.limit,
            this.orders
          )
        : [];
    return this.formatResponse(first, activeAndSides, last);
  }

  /**
   * FormatResponse
   * @param {Array<any>} first
   * @param {Array<any>} activeAndSides
   * @param {Array<any>} last
   */
  formatResponse(
    first: Array<any>,
    activeAndSides: Array<any>,
    last: Array<any>
  ) {
    let active = [];
    const sidesLen = this.sidePagingCount * 2;
    let sides = [];

    for (let i = 0; i < sidesLen; i++) {
      sides.push([]);
    }

    let page = this.startPageIndex() + 1;
    let pageIndex = 0;

    for (let index = 0; index < activeAndSides.length; index++) {
      // fill the active page data
      if (page === this.page) {
        active.push(activeAndSides[index]);
      }

      // fill the side pages sequentially
      if (page !== this.page) {
        if (sides[pageIndex]) {
          sides[pageIndex].push(activeAndSides[index]);
        }
      }

      // fill the first, if the chunk data has the first page
      if (page === 1) {
        first.push(activeAndSides[index]);
      }

      // fill the last, if the chunk data has the last page
      if (this.lastPageIndex() + 1 === page) {
        last.push(activeAndSides[index]);
      }

      // ページの区切り
      if ((index + 1) % this.limit === 0) {
        page++;
        // if (pageIndex < sidesLen && sides[pageIndex].length > 0) {
        if (pageIndex < sidesLen && sides[pageIndex].length > 0) {
          pageIndex++;
        }
      }
    }

    // name pages
    const responsePage = [];
    responsePage['active'] = active;
    responsePage['first'] = first;
    responsePage['last'] = last;

    for (var i = 0; i < sides.length; i++) {
      const pageName = this.getPageName(i);
      responsePage[pageName] = sides[i];
    }

    if (last.length === 0) {
      responsePage['last'] = responsePage['before_distant'];
    }

    return responsePage;
  }

  /**
   * クエリーパラメータを分解する
   * @param {object} queryStr クエリーパラメータ
   * @return {Query}
   */
  parseQuery(queryStr: object): Query {
    const p = new Query(30, 1, true);
    const query = queryStr;

    if (query.hasOwnProperty('limit')) {
      const limit = string.toNumber(query['limit']);
      if (limit !== null) {
        p.limit = limit;
      }
    }

    if (query.hasOwnProperty('page')) {
      const page = string.toNumber(query['page']);
      if (page !== null) {
        p.page = page;
      }
    }

    if (query.hasOwnProperty('pagination')) {
      const pagination = query['pagination'];
      if (pagination !== '' && pagination === 'false') {
        p.enabled = false;
      }
    }
    p.sort = this.parseSort(queryStr);
    return p;
  }

  /**
   * @param {object} queryStr クエリーパラメータ
   * @return {Order[]}
   */
  parseSort(queryStr: object): Order[] {
    const query = queryStr;

    if (query.hasOwnProperty('sort')) {
      const sort = query['sort'];
      if (sort !== '') {
        return this.parseOrders(sort);
      }
    }

    return [];
  }

  /**
   * @param {string} sort ソートパラメーター
   * @return {Order[]}
   */
  parseOrders(sort: string): Order[] {
    if (sort === '') {
      return;
    }

    const orders = [];
    let sortStr = '';

    for (let i = 0; i < sort.length; i++) {
      sortStr += sort[i];
      const nextChar = i + 1 < sort.length ? sort[i + 1] : ' ';
      if (cond.nextChar(nextChar)) {
        const column = sortStr.slice(1);
        const direction = cond.isPlusMinux(sortStr[0]) ? 'ASC' : 'DESC';
        const order = new Order(direction, column);
        orders.push(order);
        sortStr = '';
      }
    }

    return orders;
  }

  /**
   * ページの名前を返す
   */
  getPageName(i: number) {
    switch (i) {
      case 0:
        return 'before_distant';
      case 1:
        return 'before_near';
      case 2:
        return 'after_near';
      case 3:
        return 'after_distant';
      default:
        return number.toString(i);
    }
  }
}
