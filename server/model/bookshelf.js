'use strict';

let config = require('../config/global_config');
let db     = config.db;

let knex   = require('knex')({
    client : db.dialect,
    debug  : db.debug,
    connection: {
        host     : db.host,
        user     : db.username,
        password : db.password,
        database : db.database,
        charset  : db.charset
    },
    pool: {
        min: db.poolMin,
        max: db.poolMax 
    }
});

let bookshelf = require('bookshelf')(knex);

bookshelf.plugin('pagination')

module.exports = bookshelf;