import {Model, DataTypes} from 'sequelize';
import {db} from '../config';

class Fruit extends Model {
  public id: number;
  public name: string;
  public price: number;
  public createdAt: Date;
  public updatedAt: Date;
}

Fruit.init(
  {
    id: {
      type: new DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(255),
    },
    price: {
      type: DataTypes.NUMBER,
    },
    createdAt: {
      type: new DataTypes.DATE(),
      field: 'created_at',
    },
    updatedAt: {
      type: new DataTypes.DATE(),
      field: 'updated_at',
    },
  },
  {
    sequelize: db,
    tableName: 't_fruits',
  }
);

export default Fruit;
