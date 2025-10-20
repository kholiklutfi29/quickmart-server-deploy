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

exports.up = function(db) {
  return db.runSql(`
    CREATE TABLE IF NOT EXISTS supplies (
      supply_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL,
      product_id UUID NOT NULL,
      amount INT NOT NULL,
      price INT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT supply_user_id_fk FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT supply_product_id_fk FOREIGN KEY (product_id)
        REFERENCES products(product_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
  `);
}

exports.down = function (db) {
  return db.runSql(`DROP TABLE IF EXISTS supplies`);
};

exports._meta = {
  version: 1,
};

// exports.up = function (db) {
//   return db.createTable('supplies', {
//     supplies_id: {
//       type: 'uuid',
//       primaryKey: true,
//       defaultValue: { type: 'function', value: 'uuid_generate_v4()' },
//     },
//     stock_id: {
//       type: 'uuid',
//       notNull: true,
//       foreignKey: {
//         name: 'supplies_stock_id_fk',
//         table: 'stocks',
//         mapping: 'stock_id',
//         rules: {
//           onDelete: 'CASCADE',
//           onUpdate: 'CASCADE'
//         }
//       }
//     },
//     amount: {
//       type: 'int',
//       notNull: true
//     },
//     price: {
//       type: 'decimal',
//       notNull: true
//     },
//     created_at: {
//       type: 'timestamp',
//       notNull: true,
//       defaultValue: { type: 'function', value: 'NOW()' },
//     },
//     updated_at: {
//       type: 'timestamp',
//       notNull: true,
//       defaultValue: { type: 'function', value: 'NOW()' },
//     },
//   });
// };
