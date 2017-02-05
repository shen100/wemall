'use strict';

const config = require('../config/global_config');

const db     = config.db;

const knex = require('knex')({
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

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;