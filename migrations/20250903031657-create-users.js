"use strict";

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  // Enable UUID extension first, then create table
  db.runSql(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    CREATE TABLE IF NOT EXISTS users (
      user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(30) NOT NULL,
      email VARCHAR(30) NOT NULL,
      password VARCHAR(128) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `, callback);
};

exports.down = function (db, callback) {
  db.runSql('DROP TABLE users;', callback);
};

exports._meta = {
  version: 1
};