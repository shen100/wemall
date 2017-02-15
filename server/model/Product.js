'use strict';

let bookshelf = require('./bookshelf');
let BaseModel = require('./BaseModel');

require('./Category');

let Product = BaseModel.extend({
    tableName: 'product',
    attrs: {
    	id: {
    		field: 'id'
    	},
    	name: {
    		field: 'name'
    	},
    	browseCount: {
    		field: 'browse_count'
    	},
    	buyCount: {
    		field: 'buy_count'
    	},
    	totalSale: {
    		field: 'total_sale'
    	},
        price: {
            field: 'price'
        },
        originalPrice: {
            field: 'original_price'
        },
        status: {
            field: 'status'
        },
        remark: {
            field: 'remark'
        },
        detail: {
            field: 'detail'
        }
    },
    categories: function() {
        return this.belongsToMany('Category');
    }
}, {

});

Product.UP_SHELF   = 1;
Product.DOWN_SHELF = 2;

module.exports = bookshelf.model('Product', Product);