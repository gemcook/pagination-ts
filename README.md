# pagination-ts

## Example

```
make start
```

# Usage

## fetcher type

fetcher typeを作成する必要があります

```js
type order = {
  direction: string;
  columnName: string;
};

type fetcher<T, U> = {
  count(cond: T): number;
  fetchPage(
    cond: T,
    limit: number,
    offset: number,
    orders: order[],
  ): Array<U>;
};
```

# Example

```js
function parseFruitCondition(query) {
  // 
}

const pagination = Pagination;
const p = pagintion.parseQuery(req.query);
const cond = parseFruitCondition(req.query)

const {totalCount, totalPages, pages} = pagination.fetch(fetcher, {
  limit: p.limit,
  page: p.page,
  cond,
  orders: p.sort,
});

res.setHeader('X-Total-Count', totalCount);
res.setHeader('X-Total-Pages', totalPages);
res.json({pages});
```