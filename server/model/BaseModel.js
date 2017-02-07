'use strict';

let bookshelf = require('./bookshelf');

let BaseModel = bookshelf.Model.extend({
    format(attrs) {
        let mAttrs = this.attrs;
        if (mAttrs) {
            for (let key in mAttrs) {
                let field = mAttrs[key].field;
                if (key !== field && key in attrs) {
                    attrs[field] = attrs[key];
                    delete attrs[key];
                }
            }
            return attrs;
        } else {
            return bookshelf.Model.prototype.format.call(this, attrs);
        }
    },
    parse(attrs) {
    	let mAttrs = this.attrs;
        if (mAttrs) {
        	for (let key in mAttrs) {
                let field = mAttrs[key].field;
        		if (key !== field && field in attrs) {
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