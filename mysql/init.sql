DROP DATABASE IF EXISTS `pagination-test`;

CREATE DATABASE `pagination-test`;

use `pagination-test`;

DROP TABLE IF EXISTS `t_fruits`;

CREATE TABLE `t_fruits` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `t_fruits` (`name`, `price`)
VALUES 
  ('Apple', 112),
  ('Pear', 245),
  ('Banana', 60),
  ('Orange', 80),
  ('Kiwi', 106),
  ('Strawberry', 350),
  ('Grape', 400),
  ('Grapefruit', 150),
  ('Pineapple', 200),
  ('Cherry', 140),
  ('Mango', 199)
;
