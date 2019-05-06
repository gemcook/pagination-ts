import {Sequelize} from 'sequelize';

export const db: Sequelize = new Sequelize(
  'pagination-test',
  'root',
  'password',
  {
    dialect: 'mysql',
  }
);
