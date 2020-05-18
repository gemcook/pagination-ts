# pagination-ts


## Usage

自分で作成するもの

- データの取得条件を作成する関数
- Fetcher関数を作成

### Example

```js
import {parseQuery, fetch, Fetcher, Order} from '@gemcook/pagination-ts';

type FruitCondition = {
  PriceLowerLimit: number;
  PriceHigherLimit: number;
}

type Fruits = {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// フルーツの取得条件を作成する関数
const parseFruitsCondition = (query: any) => {
  // 何らかの処理
}

// Fetcher関数
const fruitsFetch: Fetcher<FruitCondition, Fruits> ={
  count: async (cond: FruitCondition): Promise<number> = {
    // 何らかの処理
  },
  fetchPage: async (
    cond: FruitCondition,
    limit: number,
    offset: number, 
    order: Order[],
  ): Promise<Array<Fruits>> => {
    // 何らかの処理
  }
}

const getPagination = async (query: any) => {
  const pagination = parseQuery(query);
  const cond = parseFruitsCondition(query);

  try {
    const data = await fetch(fruitsFetch, {
      limit: pagination.limit,
      page: pagination.page,
      cond,
      orders: pagination.sort,
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
```


## Demo

```
docker-compose up -d
make lib-build
yarn add file:"./" # 作成したライブラリ自身を読み込む、ライブラリpublish後、削除
make start
```