"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.runSql(`
    CREATE TABLE IF NOT EXISTS detail_transactions (
      detail_transactions_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      transaction_id UUID NOT NULL,
      product_id UUID NOT NULL,
      cost_price_at_sale INT NOT NULL,
      selling_price_at_sale INT NOT NULL,
      quantity INTEGER NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT detail_transaction_transaction_id_fk FOREIGN KEY (transaction_id)
        REFERENCES transactions(transaction_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT detail_transaction_product_id_fk FOREIGN KEY (product_id)
        REFERENCES products(product_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
  `);
}

exports.down = function (db) {
  return db.runSql(`DROP TABLE IF EXISTS detail_transactions`);
};

exports._meta = {
  version: 1,
};
;