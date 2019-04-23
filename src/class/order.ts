export class Order {
  constructor(direction: string, column: string) {
    this.direction = direction;
    this.columnName = column;
  }

  direction: string;
  columnName: string;
};
