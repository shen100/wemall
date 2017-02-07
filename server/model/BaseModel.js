'use strict';

let bookshelf = require('./bookshelf');

let BaseModel = bookshelf.Model.extend({
    parse(attrs) {
    	let mAttrs = this.attrs;
        if (mAttrs) {
        	for (let key in mAttrs) {
                let field = mAttrs[key].field;
        		if (key !== field && attrs.hasOwnProperty(field)) {
    				attrs[key] = attrs[field];
    				delete attrs[field];
        		}
        	}
            return attrs;
        } else {
            return bookshelf.Model.prototype.parse.call(this, attrs);
        }	
    }
});

module.exports = BaseModel;