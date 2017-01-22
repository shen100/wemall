'use strict';

const config    = require('../config/global_config');
const Sequelize = require('sequelize');

const db = config.db;

const sequelize = new Sequelize(db.database, db.username, db.password, {
    host    : db.host,
    dialect : db.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

module.exports = sequelize;