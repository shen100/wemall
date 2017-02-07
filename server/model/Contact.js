'use strict';

let bookshelf = require('./bookshelf');

let Contact = bookshelf.Model.extend({
    tableName: 'contact'
});

module.exports = Contact;