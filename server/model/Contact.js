'use strict';

const bookshelf = require('./bookshelf');

var Contact = bookshelf.Model.extend({
    tableName: 'contact'
});

module.exports = Contact;