"use strict";

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.runSql(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS products (
      product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL,
      barcode_number VARCHAR(255) NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      cost_price INT NOT NULL,
      selling_price INT NOT NULL,
      current_stock INT NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT product_user_id_fk FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT unique_user_barcode UNIQUE (user_id, barcode_number)
    );
  `);
};

exports.down = function (db) {
  return db.runSql(`DROP TABLE IF EXISTS products;`);
};

exports._meta = {
  version: 1,
};
